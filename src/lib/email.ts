import type { SiteSettings } from "./types";
import { isEmail } from "./utils";

export type MailPayload = {
  subject: string;
  name: string;
  email?: string;
  phone?: string;
  message: string;
  extra?: Record<string, string>;
  botcheck?: boolean;
};

export type MailResult =
  | { ok: true; mode: "web3forms" | "ignored" }
  | { ok: false; reason: "missing-key" | "request" | "rejected"; detail?: string };

export async function sendToInbox(settings: SiteSettings, payload: MailPayload): Promise<MailResult> {
  if (payload.botcheck) return { ok: true, mode: "ignored" };

  const accessKey = settings.web3formsKey.trim();
  if (!accessKey) return { ok: false, reason: "missing-key" };

  const body: Record<string, string> = {
    access_key: accessKey,
    subject: payload.subject,
    from_name: settings.siteName.en || "Ceylon Trails",
    name: payload.name,
    message: payload.message,
  };

  if (payload.email && isEmail(payload.email)) {
    body.email = payload.email;
    body.replyto = payload.email;
  }

  if (payload.phone) body.phone = payload.phone;
  if (settings.email) body.studio_email = settings.email;
  for (const [key, value] of Object.entries(payload.extra ?? {})) {
    if (value) body[key] = value;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = (await response.json()) as { success?: boolean; message?: string };
    if (!response.ok || !data.success) {
      return { ok: false, reason: "rejected", detail: data.message };
    }
    return { ok: true, mode: "web3forms" };
  } catch {
    return { ok: false, reason: "request" };
  }
}
