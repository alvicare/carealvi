#!/usr/bin/env python3
"""
AlviCare (Team 43) — Automated Google Docs Keystroke & Rich-Paste Script
========================================================================
Assigned Member : Thevindu
Assigned Scope  : Chapter 5 (SLEP Issues) & Chapter 6 (System Architecture & Design)
Body Element Range in Team43.docx: index 423 to 537 (exclusive)

What this script does automatically (hands-free):
  1. Reads exact content, styles, colors, tables, and diagrams from Team43.docx.
  2. Types all headings, paragraphs, and bullet points using REAL KEYSTROKES
     with Google Docs shortcuts (Heading 1/2/3, Bold, Italic, Underline, Bullets).
  3. Copies every diagram/image directly from Team43.docx to your clipboard and
     pastes it into Google Docs (Ctrl+V).
  4. Converts every table into exact styled HTML (preserving cell shading colors,
     borders, column spans, fonts, and text colors), copies it to clipboard, and
     pastes it into Google Docs (Ctrl+V).

Prerequisites (run once):
    pip install python-docx pynput pillow pywin32
    (On Linux instead of pywin32: sudo apt install xclip)

Usage:
    python 04_Thevindu_Ch5_Ch6.py
    python 04_Thevindu_Ch5_Ch6.py --speed fast
    python 04_Thevindu_Ch5_Ch6.py --speed human
    python 04_Thevindu_Ch5_Ch6.py --start-from 120
    python 04_Thevindu_Ch5_Ch6.py --dry-run

Emergency Stop:
    Press Ctrl+C in the terminal OR move your mouse to the top-left corner (0, 0)
    or press the ESC key at any time to abort immediately.
"""

import argparse
import io
import os
import platform
import random
import subprocess
import sys
import time
import html as html_lib

from docx import Document
from docx.oxml.text.paragraph import CT_P
from docx.oxml.table import CT_Tbl
from docx.text.paragraph import Paragraph
from docx.table import Table
from PIL import Image

# =============================================================================
# CONFIGURATION FOR THIS TEAM MEMBER
# =============================================================================
MEMBER_NAME = "Thevindu"
SCOPE_DESC  = "Chapter 5 (SLEP Issues) & Chapter 6 (System Architecture & Design)"
DOCX_PATH   = "Team43.docx"
START_IDX   = 423
END_IDX     = 537

SPEED_PRESETS = {
    "fast":   (0.003, 0.008),
    "normal": (0.010, 0.022),
    "human":  (0.028, 0.065),
}

NS_W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
NS_A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
NS_R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"

IS_WIN = platform.system() == "Windows"
IS_MAC = platform.system() == "Darwin"
IS_LIN = platform.system() == "Linux"

ABORT_REQUESTED = False


# =============================================================================
# CLIPBOARD HELPERS (IMAGES + RICH HTML TABLES)
# =============================================================================
def _build_cf_html(html_fragment: str) -> bytes:
    """Build valid Windows CF_HTML payload with exact UTF-8 byte offsets."""
    header_tpl = (
        "Version:0.9\r\n"
        "StartHTML:{:010d}\r\n"
        "EndHTML:{:010d}\r\n"
        "StartFragment:{:010d}\r\n"
        "EndFragment:{:010d}\r\n"
    )
    prefix = "<html><body>\r\n<!--StartFragment-->"
    suffix = "<!--EndFragment-->\r\n</body></html>"
    dummy_header = header_tpl.format(0, 0, 0, 0).encode("utf-8")
    start_html = len(dummy_header)
    prefix_b = prefix.encode("utf-8")
    frag_b = html_fragment.encode("utf-8")
    suffix_b = suffix.encode("utf-8")
    start_frag = start_html + len(prefix_b)
    end_frag = start_frag + len(frag_b)
    end_html = end_frag + len(suffix_b)
    header = header_tpl.format(start_html, end_html, start_frag, end_frag).encode("utf-8")
    return header + prefix_b + frag_b + suffix_b


def copy_html_to_clipboard(html_fragment: str, plain_fallback: str = ""):
    if IS_WIN:
        import win32clipboard
        cf_html = win32clipboard.RegisterClipboardFormat("HTML Format")
        payload = _build_cf_html(html_fragment)
        win32clipboard.OpenClipboard()
        try:
            win32clipboard.EmptyClipboard()
            win32clipboard.SetClipboardData(cf_html, payload)
            if plain_fallback:
                win32clipboard.SetClipboardData(win32clipboard.CF_UNICODETEXT, plain_fallback)
        finally:
            win32clipboard.CloseClipboard()
    elif IS_LIN:
        p = subprocess.Popen(
            ["xclip", "-selection", "clipboard", "-t", "text/html"],
            stdin=subprocess.PIPE,
        )
        p.communicate(input=html_fragment.encode("utf-8"))
    elif IS_MAC:
        hex_html = html_fragment.encode("utf-8").hex()
        script = f'set the clipboard to «data HTML{hex_html}»'
        subprocess.run(["osascript", "-e", script], check=True)
    else:
        raise RuntimeError(f"Unsupported OS: {platform.system()}")


def copy_image_to_clipboard(img_bytes: bytes):
    img = Image.open(io.BytesIO(img_bytes))
    if IS_WIN:
        import win32clipboard
        output = io.BytesIO()
        img.convert("RGB").save(output, "BMP")
        dib_data = output.getvalue()[14:]  # Strip 14-byte BMP file header for CF_DIB
        output.close()
        win32clipboard.OpenClipboard()
        try:
            win32clipboard.EmptyClipboard()
            win32clipboard.SetClipboardData(win32clipboard.CF_DIB, dib_data)
        finally:
            win32clipboard.CloseClipboard()
    elif IS_LIN:
        output = io.BytesIO()
        img.save(output, "PNG")
        p = subprocess.Popen(
            ["xclip", "-selection", "clipboard", "-t", "image/png"],
            stdin=subprocess.PIPE,
        )
        p.communicate(input=output.getvalue())
    elif IS_MAC:
        tmp_png = "/tmp/_alvicare_clip.png"
        img.save(tmp_png, "PNG")
        subprocess.run(
            ["osascript", "-e", f'set the clipboard to (read (POSIX file "{tmp_png}") as «class PNGf»)'],
            check=True,
        )
    else:
        raise RuntimeError(f"Unsupported OS: {platform.system()}")


# =============================================================================
# DOCX -> EXACT STYLED HTML CONVERTER FOR TABLES
# =============================================================================
def _is_dark_hex(hex_color: str) -> bool:
    h = hex_color.lstrip("#")
    if len(h) != 6:
        return False
    try:
        r, g, b = int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)
        luminance = 0.299 * r + 0.587 * g + 0.114 * b
        return luminance < 128
    except ValueError:
        return False


def _paragraph_to_html(p_el, default_color="#202124") -> str:
    runs_html = []
    for r_el in p_el.findall(f".//{NS_W}r"):
        texts = [t.text or "" for t in r_el.findall(f"{NS_W}t")]
        txt = "".join(texts)
        has_br = r_el.find(f"{NS_W}br") is not None
        if not txt and not has_br:
            continue
        rPr = r_el.find(f"{NS_W}rPr")
        styles = []
        bold = italic = underline = False
        color_hex = None
        font_name = "Roboto, Arial, sans-serif"
        font_pt = None
        if rPr is not None:
            b_el = rPr.find(f"{NS_W}b")
            if b_el is not None and b_el.get(f"{NS_W}val", "true").lower() not in ("0", "false"):
                bold = True
            i_el = rPr.find(f"{NS_W}i")
            if i_el is not None and i_el.get(f"{NS_W}val", "true").lower() not in ("0", "false"):
                italic = True
            u_el = rPr.find(f"{NS_W}u")
            if u_el is not None and u_el.get(f"{NS_W}val", "single") != "none":
                underline = True
            c_el = rPr.find(f"{NS_W}color")
            if c_el is not None:
                val = c_el.get(f"{NS_W}val")
                if val and val.lower() != "auto":
                    color_hex = "#" + val
            sz_el = rPr.find(f"{NS_W}sz")
            if sz_el is not None and sz_el.get(f"{NS_W}val"):
                try:
                    font_pt = int(sz_el.get(f"{NS_W}val")) / 2.0
                except ValueError:
                    pass
            rf_el = rPr.find(f"{NS_W}rFonts")
            if rf_el is not None:
                fn = rf_el.get(f"{NS_W}ascii") or rf_el.get(f"{NS_W}hAnsi")
                if fn:
                    font_name = f"'{fn}', Roboto, Arial, sans-serif"

        styles.append(f"font-family:{font_name}")
        styles.append(f"color:{color_hex or default_color}")
        if font_pt:
            styles.append(f"font-size:{font_pt}pt")
        if bold:
            styles.append("font-weight:bold")
        if italic:
            styles.append("font-style:italic")
        if underline:
            styles.append("text-decoration:underline")

        escaped = html_lib.escape(txt)
        if has_br:
            escaped += "<br>"
        runs_html.append(f'<span style="{";".join(styles)}">{escaped}</span>')

    return "".join(runs_html) if runs_html else "&nbsp;"


def table_xml_to_html(tbl_el) -> str:
    """Convert a python-docx CT_Tbl XML element into rich HTML preserving exact fills & spans."""
    rows = tbl_el.findall(f"{NS_W}tr")
    html_rows = []
    for r_idx, tr in enumerate(rows):
        cells = tr.findall(f"{NS_W}tc")
        html_cells = []
        for tc in cells:
            tcPr = tc.find(f"{NS_W}tcPr")
            colspan = 1
            bg_hex = None
            vmerge = None
            if tcPr is not None:
                gs = tcPr.find(f"{NS_W}gridSpan")
                if gs is not None and gs.get(f"{NS_W}val"):
                    colspan = int(gs.get(f"{NS_W}val"))
                vm = tcPr.find(f"{NS_W}vMerge")
                if vm is not None:
                    vmerge = vm.get(f"{NS_W}val", "continue")
                shd = tcPr.find(f"{NS_W}shd")
                if shd is not None:
                    fill = shd.get(f"{NS_W}fill")
                    if fill and fill.lower() not in ("auto", "clear", "nil"):
                        bg_hex = "#" + fill

            if vmerge == "continue":
                continue

            default_txt_color = "#FFFFFF" if (bg_hex and _is_dark_hex(bg_hex)) else "#202124"
            p_htmls = [_paragraph_to_html(p_el, default_txt_color) for p_el in tc.findall(f"{NS_W}p")]
            cell_content = "<br>".join(p_htmls)

            td_styles = [
                "border:1px solid #CBD5E1",
                "padding:6px 8px",
                "vertical-align:top",
                "font-family:Roboto, Arial, sans-serif",
                "font-size:10pt",
            ]
            if bg_hex:
                td_styles.append(f"background-color:{bg_hex}")
            if default_txt_color == "#FFFFFF":
                td_styles.append("color:#FFFFFF")
                td_styles.append("font-weight:bold")

            span_attr = f' colspan="{colspan}"' if colspan > 1 else ""
            html_cells.append(f'<td{span_attr} style="{";".join(td_styles)}">{cell_content}</td>')

        if html_cells:
            html_rows.append("<tr>" + "".join(html_cells) + "</tr>")

    # Adding a trailing empty <p></p> ensures Google Docs places the cursor BELOW the table after paste
    return (
        '<table style="border-collapse:collapse;width:100%;font-family:Roboto,Arial,sans-serif;">'
        + "".join(html_rows)
        + "</table><p></p>"
    )


# =============================================================================
# KEYSTROKE & SHORTCUT CONTROLLER (pynput)
# =============================================================================
class DocsTyper:
    def __init__(self, delay_range=(0.010, 0.022)):
        from pynput.keyboard import Controller, Key, Listener
        self.kb = Controller()
        self.Key = Key
        self.delay_min, self.delay_max = delay_range
        self.mod = Key.cmd if IS_MAC else Key.ctrl
        self.alt = Key.alt

        def on_press(key):
            global ABORT_REQUESTED
            if key == Key.esc:
                ABORT_REQUESTED = True
                print("\n[!] ESC pressed — aborting safely!")
                return False

        self.listener = Listener(on_press=on_press)
        self.listener.daemon = True
        self.listener.start()

    def _check_abort(self):
        if ABORT_REQUESTED:
            sys.exit(0)

    def hotkey(self, *keys):
        self._check_abort()
        for k in keys:
            self.kb.press(k)
            time.sleep(0.02)
        for k in reversed(keys):
            self.kb.release(k)
            time.sleep(0.02)
        time.sleep(0.06)

    def paste(self, wait_after=1.0):
        self.hotkey(self.mod, "v")
        time.sleep(wait_after)

    def enter(self, count=1):
        self._check_abort()
        for _ in range(count):
            self.kb.press(self.Key.enter)
            self.kb.release(self.Key.enter)
            time.sleep(0.05)

    def set_heading(self, level: int):
        """Apply Google Docs Heading 1/2/3 or Normal (0) via Ctrl+Alt+<N>."""
        if level in (0, 1, 2, 3):
            self.hotkey(self.mod, self.alt, str(level))
            time.sleep(0.08)

    def toggle_bold(self):
        self.hotkey(self.mod, "b")

    def toggle_italic(self):
        self.hotkey(self.mod, "i")

    def toggle_underline(self):
        self.hotkey(self.mod, "u")

    def toggle_bullets(self):
        self.hotkey(self.mod, self.Key.shift, "8")
        time.sleep(0.08)

    def type_text(self, text: str):
        for ch in text:
            self._check_abort()
            if ch == "\n":
                self.hotkey(self.Key.shift, self.Key.enter)
                continue
            if ch == "\t":
                self.kb.press(self.Key.tab)
                self.kb.release(self.Key.tab)
            else:
                try:
                    self.kb.type(ch)
                except Exception:
                    pass
            time.sleep(random.uniform(self.delay_min, self.delay_max))


# =============================================================================
# MAIN EXECUTION ENGINE
# =============================================================================
def get_heading_level(p: Paragraph) -> int:
    name = (p.style.name or "").lower()
    # Guard against long body paragraphs accidentally tagged as Heading 2 in source XML
    if len(p.text.strip()) > 140:
        return 0
    if "heading 1" in name:
        return 1
    if "heading 2" in name:
        return 2
    if "heading 3" in name:
        return 3
    return 0


def is_list_paragraph(p_el) -> bool:
    pPr = p_el.find(f"{NS_W}pPr")
    return pPr is not None and pPr.find(f"{NS_W}numPr") is not None


def extract_blips(el, doc):
    blobs = []
    for blip in el.findall(f".//{NS_A}blip"):
        rId = blip.get(f"{NS_R}embed")
        if rId and rId in doc.part.related_parts:
            blobs.append(doc.part.related_parts[rId].blob)
    return blobs


def run_script(docx_path: str, speed: str, start_from: int, dry_run: bool, exact_html_text: bool):
    if not os.path.exists(docx_path):
        print(f"[ERROR] Could not find '{docx_path}' in current folder: {os.getcwd()}")
        print("Place Team43.docx in the same folder as this script and run again.")
        sys.exit(1)

    doc = Document(docx_path)
    body = doc.element.body
    actual_start = max(START_IDX, start_from)
    total_items = END_IDX - actual_start

    print("=" * 72)
    print(f"  AlviCare Auto-Typer | Member : {MEMBER_NAME}")
    print(f"  Assigned Chapters   | Scope  : {SCOPE_DESC}")
    print(f"  Elements to process : {total_items} (XML idx {actual_start} .. {END_IDX - 1})")
    print(f"  Typing Speed        : {speed} {SPEED_PRESETS[speed]}")
    print("=" * 72)
    print("  TIP: For exact navy headings & Roboto font, set Google Docs")
    print("       Normal text = Roboto 11pt, Headings 1-3 = #1F3864 (Navy).")
    print("  STOP ANYTIME: Press ESC key or Ctrl+C in this terminal.")
    print("=" * 72)

    if dry_run:
        print("[DRY RUN] Previewing all actions without typing...\n")
        for idx in range(actual_start, END_IDX):
            child = body[idx]
            if isinstance(child, CT_P):
                p = Paragraph(child, doc)
                imgs = extract_blips(child, doc)
                if imgs:
                    print(f"  [{idx}] PASTE IMAGE ({len(imgs)} diagram(s))")
                txt = p.text.strip()
                if txt:
                    hl = get_heading_level(p)
                    tag = f"H{hl}" if hl else ("BULLET" if is_list_paragraph(child) else "TEXT")
                    print(f"  [{idx}] TYPE {tag:6s}: {txt[:85]}")
            elif isinstance(child, CT_Tbl):
                imgs = extract_blips(child, doc)
                tbl = Table(child, doc)
                plain = " ".join(c.text.strip() for r in tbl.rows for c in r.cells).strip()
                if imgs and not plain:
                    print(f"  [{idx}] PASTE DIAGRAM FROM TABLE ({len(imgs)} image(s))")
                else:
                    print(f"  [{idx}] PASTE STYLED TABLE ({len(tbl.rows)} rows x {len(tbl.columns)} cols)")
        print("\n[DRY RUN COMPLETE] Ready to run for real!")
        return

    print("\nClick inside your Google Doc where you want to start...")
    for sec in range(7, 0, -1):
        print(f"  Starting in {sec}...", flush=True)
        time.sleep(1)
    print("  GO! Hands off keyboard & mouse.\n")

    typer = DocsTyper(delay_range=SPEED_PRESETS[speed])
    in_bullet_list = False

    for idx in range(actual_start, END_IDX):
        child = body[idx]

        # ---- PARAGRAPH ----
        if isinstance(child, CT_P):
            p = Paragraph(child, doc)
            imgs = extract_blips(child, doc)
            txt = p.text.strip()

            # Paste any embedded diagram(s) in this paragraph
            if imgs:
                if in_bullet_list:
                    typer.enter()
                    in_bullet_list = False
                for img_i, blob in enumerate(imgs, 1):
                    print(f"[{idx}/{END_IDX-1}] Pasting diagram {img_i}/{len(imgs)} ({len(blob)//1024} KB)...")
                    copy_image_to_clipboard(blob)
                    time.sleep(0.15)
                    typer.paste(wait_after=2.5)
                    typer.enter()

            if not txt:
                continue

            hl = get_heading_level(p)
            is_bullet = is_list_paragraph(child) and hl == 0

            # Manage bullet list state cleanly
            if is_bullet and not in_bullet_list:
                typer.set_heading(0)
                typer.toggle_bullets()
                in_bullet_list = True
            elif not is_bullet and in_bullet_list:
                typer.enter()  # Exit bullet list
                in_bullet_list = False

            if exact_html_text:
                # Optional exact-color HTML paste for paragraphs
                p_html = f"<p>{_paragraph_to_html(child)}</p>"
                if hl in (1, 2, 3):
                    p_html = f"<h{hl}>{_paragraph_to_html(child)}</h{hl}>"
                print(f"[{idx}/{END_IDX-1}] Pasting styled paragraph: {txt[:60]}...")
                copy_html_to_clipboard(p_html, plain_fallback=txt)
                time.sleep(0.1)
                typer.paste(wait_after=0.35)
                typer.enter()
                continue

            # Apply Heading level (or Normal)
            if not is_bullet:
                typer.set_heading(hl)

            tag = f"H{hl}" if hl else ("BULLET" if is_bullet else "TEXT")
            print(f"[{idx}/{END_IDX-1}] Typing {tag}: {txt[:65]}...")

            # Type run-by-run preserving Bold / Italic / Underline
            cur_b = cur_i = cur_u = False
            for r in p.runs:
                r_txt = r.text
                if not r_txt:
                    continue
                want_b = bool(r.bold) and hl == 0
                want_i = bool(r.italic)
                want_u = bool(r.underline)

                if want_b != cur_b:
                    typer.toggle_bold()
                    cur_b = want_b
                if want_i != cur_i:
                    typer.toggle_italic()
                    cur_i = want_i
                if want_u != cur_u:
                    typer.toggle_underline()
                    cur_u = want_u

                typer.type_text(r_txt)

            # Reset active inline styles before newline
            if cur_b:
                typer.toggle_bold()
            if cur_i:
                typer.toggle_italic()
            if cur_u:
                typer.toggle_underline()

            typer.enter()
            if hl > 0:
                typer.set_heading(0)

        # ---- TABLE ----
        elif isinstance(child, CT_Tbl):
            if in_bullet_list:
                typer.enter()
                in_bullet_list = False

            imgs = extract_blips(child, doc)
            tbl = Table(child, doc)
            plain_text = "\n".join(
                " | ".join(c.text.strip() for c in r.cells) for r in tbl.rows
            ).strip()

            # If table is just a wrapper around a diagram (e.g., Rich Picture in 1.8)
            if imgs and not plain_text.replace("|", "").strip():
                for blob in imgs:
                    print(f"[{idx}/{END_IDX-1}] Pasting diagram from table ({len(blob)//1024} KB)...")
                    copy_image_to_clipboard(blob)
                    time.sleep(0.15)
                    typer.paste(wait_after=2.5)
                    typer.enter()
            else:
                print(f"[{idx}/{END_IDX-1}] Pasting styled table ({len(tbl.rows)}x{len(tbl.columns)})...")
                html_tbl = table_xml_to_html(child)
                copy_html_to_clipboard(html_tbl, plain_fallback=plain_text)
                time.sleep(0.15)
                typer.paste(wait_after=1.4)
                typer.enter()

    if in_bullet_list:
        typer.enter()

    print("\n" + "=" * 72)
    print(f"  DONE! {MEMBER_NAME}'s section ({SCOPE_DESC}) is complete!")
    print("=" * 72)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=f"Auto-type {MEMBER_NAME}'s chapters into Google Docs.")
    parser.add_argument("--docx", default=DOCX_PATH, help="Path to Team43.docx")
    parser.add_argument("--speed", choices=list(SPEED_PRESETS.keys()), default="normal", help="Typing speed")
    parser.add_argument("--start-from", type=int, default=START_IDX, help="Resume from XML element index")
    parser.add_argument("--dry-run", action="store_true", help="Preview actions without typing")
    parser.add_argument("--exact-html-text", action="store_true", help="Paste paragraphs as rich HTML instead of typing keystrokes")
    args = parser.parse_args()
    run_script(args.docx, args.speed, args.start_from, args.dry_run, args.exact_html_text)
