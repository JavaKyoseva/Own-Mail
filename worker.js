import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    return new Response(htmlContent, {
      headers: { "Content-Type": "text/html;charset=UTF-8" }
    });
  },

  async email(message, env, ctx) {
    const TELEGRAM_TOKEN = "8858269442:AAFZP2Yg2C4oa1waVhQwzvB6Ss8TopjXlJk";
    const CHAT_ID = "6154986673";

    try {
      const from = message.from;
      const to = message.to;
      const subject = message.headers.get("subject") || "(Konu Belirtilmemiş)";

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

      let telegramMessage = `📬 *YENİ E-POSTA GELDI!*\n\n` +
                            `👤 *Kimden:* \`${from}\`\n` +
                            `🎯 *Kime:* \`${to}\`\n` +
                            `📌 *Konu:* ${subject}\n\n`;

      if (extractedCode) {
        telegramMessage += `🔑 *TESPİT EDİLEN DOĞRULAMA KODU:*\n\`${extractedCode}\`\n\n`;
      }

      telegramMessage += `📝 *Mesaj Özeti:*\n\`\`\`\n${summaryText}\n\`\`\``;

      const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown"
        })
      });

    } catch (err) {
      console.error("Mail işlenirken hata:", err);
    }
  }
};