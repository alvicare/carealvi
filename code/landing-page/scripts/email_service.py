#!/usr/bin/env python3
"""
ALVI Care — Local Email Microservice Daemon
Listens on http://127.0.0.1:8088/api/order and triggers send_waitlist_emails
"""

import sys
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from send_order_email import send_waitlist_emails

PORT = 8088

class EmailRequestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        if self.path in ["/api/order", "/api/waitlist"]:
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            try:
                payload = json.loads(post_data.decode("utf-8"))
                success = send_waitlist_emails(payload)
                self.send_response(200 if success else 500)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                response = {
                    "success": success,
                    "reservationId": payload.get("id"),
                    "message": "Notification dispatched to team and confirmation sent to customer."
                }
                self.wfile.write(json.dumps(response).encode("utf-8"))
            except Exception as e:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

def run():
    server = HTTPServer(("127.0.0.1", PORT), EmailRequestHandler)
    print(f"ALVI Email Microservice listening on http://127.0.0.1:{PORT}/api/order")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    server.server_close()

if __name__ == "__main__":
    run()
