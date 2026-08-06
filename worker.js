export default {
  async fetch(request, env, ctx) {
    const targetUrl = "https://domainetta.netlify.app"; 

    const url = new URL(request.url);
    const destination = targetUrl + url.pathname + url.search;

    const response = await fetch(destination, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : null
    });

    return response;
  },

  async email(message, env, ctx) {
    // Sensitive data replaced with env variables / placeholders
    const TELEGRAM_TOKEN = env.TELEGRAM_TOKEN || "YOUR_TELEGRAM_BOT_TOKEN";
    const CHAT_ID = env.CHAT_ID || "YOUR_TELEGRAM_CHAT_ID";

    try {
      const from = message.from;
      const to = message.to;
      const subject = message.headers.get("subject") || "(No Subject Specified)";
      const rawEmail = await new Response(message.raw).text();
      let bodyText = "";

      if (rawEmail.includes("\r\n\r\n")) {
        bodyText = rawEmail.split("\r\n\r\n").slice(1).join("\r\n\r\n");
        bodyText = bodyText.replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
      } else {
        bodyText = rawEmail;
      }

      const codeMatch = bodyText.match(/\b\d{4,8}\b/);
      const extractedCode = codeMatch ? codeMatch[0] : null;

      let summaryText = bodyText.substring(0, 700);
      if (bodyText.length > 700) summaryText += "...";

      let telegramMessage = `📬 *NEW EMAIL RECEIVED!*\n\n` + 
                            `👤 *From:* \`${from}\`\n` + 
                            `🎯 *To:* \`${to}\`\n` + 
                            `📌 *Subject:* ${subject}\n\n`;

      if (extractedCode) {
        telegramMessage += `🔑 *DETECTED VERIFICATION CODE:*\n\`${extractedCode}\`\n\n`;
      }

      telegramMessage += `📝 *Message Summary:*\n\`\`\`\n${summaryText}\n\`\`\``;

      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMessage, parse_mode: "Markdown" })
      });
    } catch (err) {
      console.error("Error processing mail:", err);
    }
  }
};
