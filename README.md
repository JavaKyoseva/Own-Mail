# 🚀 Unlimited Custom Email Generator & Telegram Forwarder

Turn your personal domain into an **infinite temporary/custom email generator**! 

This serverless project lets you create **unlimited email addresses on the fly** (e.g., `netflix@yourdomain.com`, `anything@yourdomain.com`) without setup.
Any incoming mail sent to your domain is automatically captured, parsed, and pushed straight to your **Telegram inbox in real time**. 

Includes a lightweight web interface (`index.html`) and powered by Cloudflare Workers.

---

## 🔥 Why Is This Awesome?

- ♾️ **Unlimited Custom Emails:** No need to create accounts. Use any address like `spotify@yourdomain.com` or `spam-test@yourdomain.com` instantly.
- 📬 **Instant Telegram Alerts:** Recieve all emails directly inside Telegram with sender, subject, and content fully parsed.
- 🛡️ **Privacy & Spam Protection:** Never leak your primary email address to sketchy websites again.
- 🌐 **Built-in Web Interface:** Includes `index.html` for status monitoring or custom frontend integrations.
- ⚡ **100% Free & Serverless:** Zero hosting cost, powered entirely by Cloudflare's free edge network.

## ⚠️ Required Configuration

Before deploying, you **MUST** configure your Telegram Bot credentials inside `worker.js`:

### 1. Open `worker.js`.

### 2. Locate the configuration variables at the top:

   - Replace `YOUR_TELEGRAM_BOT_TOKEN` with your bot token from https://t.me/BotFather
   - Replace `YOUR_TELEGRAM_CHAT_ID` with your numeric Chat ID (get it from https://t.me/userinfobot)

## 🚀 Step-by-Step Setup
1. Enable Unlimited Catch-All Emails
 * Log in to your Cloudflare Dashboard and select your domain.
 * Go to Email -> Email Routing and hit Enable (Cloudflare will auto-configure MX/SPF records).
 * Go to the Routes tab and activate Catch-all address:
   * Set Action -> Send to a Worker.
   * Select your deployed Worker as the target.
     (Now literally any email ending in @yourdomain.com will trigger your Worker!)

2. Deploy Code

Option A: Direct Web Dashboard (Fastest)
 * Go to Workers & Pages -> Create Application -> Create Worker.
 * Paste worker.js (with your Bot credentials) into the online editor.
 * Click Save and Deploy.

Option B: Via Termux / Terminal (Wrangler CLI)
 * Clone this repository:
   git clone https://github.com/JavaKyoseva/Own-Mail.git
cd Own-Mail

 * Log in and deploy:
   npx wrangler login
npx wrangler deploy worker.js --name custom-email-worker

## 🧪 Quick Test
 * Send a test email from Gmail or Outlook to ANY random address under your domain (e.g., random123@yourdomain.com).
 * Open Telegram — your bot will instantly ping you with the full email payload!
 * Visit your Worker URL in a browser to check out the index.html web page.

## 📄 License
Released under the MIT License. Feel free to fork and customize!

