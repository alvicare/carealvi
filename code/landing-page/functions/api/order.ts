/**
 * Cloudflare Pages Function: /api/order
 * Aliases directly to /api/waitlist handler for backward compatibility.
 */

import { onRequestPost as handleWaitlistPost, onRequestOptions as handleWaitlistOptions } from "./waitlist";

export const onRequestPost = handleWaitlistPost;
export const onRequestOptions = handleWaitlistOptions;
