# ✉️ Cloudflare Email to Telegram Forwarder

A serverless project built on Cloudflare Workers and Email Routing that intercepts incoming emails, parses their content (sender, subject, body), and instantly forwards them directly to your **Telegram Chat/Group** via a Telegram Bot. It also includes an `index.html` web interface for status checks or custom routing.

---

## 📌 Features

- **Automated Email Parsing:** Extracts `From`, `Subject`, and `Body` from all incoming emails.
- **Telegram Notification System:** Sends real-time email alerts straight to your Telegram via Telegram Bot API.
- **Web Interface (`index.html`):** Lightweight web page integration for frontend interactions or service monitoring.
- **Zero Hosting Cost:** Runs entirely on Cloudflare's free Worker and Email Routing quotas.

---

## 📁 Repository Structure


├── worker.js          # Main Cloudflare Worker script (Email listener & Telegram dispatch)
├── index.html         # Web frontend / landing interface
├── .gitignore         # Untracked files list
└── README.md          # Project documentation

---

## ⚠️ Configuration (IMPORTANT)

Before deploying, you **MUST** update your credentials in `worker.js`:

1. Open `worker.js`.
2. Locate the configuration variables at the top of the file:
   - Replace `YOUR_TELEGRAM_BOT_TOKEN` with your actual Bot Token from [@BotFather](https://t.me/BotFather).
   - Replace `YOUR_TELEGRAM_CHAT_ID` with your numeric Chat ID (you can get this from [@userinfobot](https://t.me/userinfobot)).

```javascript
// Example in worker.js
const BOT_TOKEN = "123456789:ABCdefGHIjklMNOpqrsTUVwxyZ";
const CHAT_ID = "987654321";

🚀 Setup & Deployment Guide
Step 1: Configure Cloudflare Email Routing
 * Log in to your Cloudflare Dashboard and select your domain.
 * Go to Email -> Email Routing and enable the service (let Cloudflare automatically set up the required MX/SPF DNS records).
 * Under the Routes tab:
   * Set up a custom rule or enable Catch-all address.
   * Set Action to Send to a Worker.
   * Select your deployed Worker as the destination.
Step 2: Deploy to Cloudflare Workers
Method A: Cloudflare Web Dashboard (Quickest)
 * Go to Workers & Pages -> Create Application -> Create Worker.
 * Paste the contents of worker.js into the online editor (make sure to update your BOT_TOKEN and CHAT_ID).
 * Click Save and Deploy.
Method B: Via Termux / Command Line (Wrangler CLI)
 * Clone this repository to your device or Termux environment:
   git clone [https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git)
cd YOUR_REPO_NAME

 * Authenticate Wrangler with Cloudflare:
   npx wrangler login

 * Deploy the project:
   npx wrangler deploy worker.js --name cf-email-telegram-worker

🧪 How to Test
 * Send an email from any external email provider (Gmail, Outlook, etc.) to your Cloudflare domain address (e.g., info@yourdomain.com).
 * Check your Telegram chat. The bot will deliver a formatted message containing the email details immediately.
 * Open your Worker's deployed domain URL in a web browser to view the index.html interface.

📄 License
This project is open-source and available under the MIT License.


