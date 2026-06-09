# box-agent

The real on-box Appie agent: a small, self-contained Node program that runs ON
each customer's provisioned box and IS the customer's Appie.

## What it does

- Reads config from `/etc/appie/{bot.env,llm.env,SOUL.md}` + `/etc/appie/heartbeat.env`.
- Long-polls Telegram (`getUpdates`) with the customer bot token, so it works
  behind UFW deny-incoming with no inbound webhook / open port.
- On each text message: calls OpenRouter chat/completions (primary model, falls
  back to backup on error) with a SOUL-derived system prompt + short rolling
  memory, then replies via `sendMessage`.
- On each voice message: `getFile` -> download -> faster-whisper transcribe
  (best-effort; degrades to "please type" when whisper is absent) -> LLM.
- Posts a heartbeat to `APP_URL/api/appie/heartbeat` every 60s.
- Keeps per-chat conversation memory in `/var/lib/appie/chat-<id>.json`.

Zero npm deps: Node built-ins + global fetch (Node 22).

## Files

- `agent.mjs` - the agent program (source of truth).
- `appie-agent.service` - systemd unit (auto-restart, starts on boot).
- `gen-embed.mjs` - regenerates `src/lib/provisioning/box-agent-embed.ts`
  (base64 of the two files) so the Next bundler inlines them into the
  provisioner. Run `npm run gen:box-agent` after editing `agent.mjs` or the unit.

## How it ships

`src/lib/provisioning/box-setup.ts` decodes the embedded base64 into
`/opt/appie/agent.mjs` + the systemd unit, writes `/etc/appie/*`, installs
faster-whisper, and `systemctl enable --now appie-agent`. cloud-init (Hetzner)
runs the same payload.

## Local testing

`agent.mjs` honours `APPIE_ETC` / `APPIE_STATE` env overrides so it can run
against a throwaway config dir off-box.
