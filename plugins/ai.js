const fetch = require("node-fetch");
const { cmd } = require("../command");

const OPENAI_API_KEY = "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"; // ← your new key (DO NOT SHARE)

cmd({
    pattern: "ai",
    desc: "AI chat with OpenAI",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a prompt.");

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: q }]
            })
        });

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;

        if (text) {
            reply(text);
        } else {
            reply("⚠️ No response from AI.");
        }
    } catch (e) {
        console.error(e);
        reply("❌ Error: " + e.message);
    }
});
