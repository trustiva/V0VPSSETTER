import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { telegramId, planType, transactionId } = await request.json()

    // Telegram Bot configuration
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = telegramId.replace("@", "")

    // Generate configuration based on plan
    const config = generateVPNConfig(planType, transactionId)

    // Send configuration via Telegram
    const message = `🎉 Welcome to Private Workspace!

Your ${planType} plan is now active.

📱 **Configuration:**
\`\`\`
${config.configText}
\`\`\`

🔗 **Quick Setup Links:**
• [Android Setup](${config.androidLink})
• [iOS Setup](${config.iosLink})
• [Windows Setup](${config.windowsLink})

📞 **Support:** @PrivateWorkspaceSupport
🆔 **Transaction ID:** ${transactionId}

Enjoy your secure internet workspace! 🚀`

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (telegramResponse.ok) {
      return NextResponse.json({ success: true })
    } else {
      throw new Error("Failed to send Telegram message")
    }
  } catch (error) {
    console.error("Telegram send error:", error)
    return NextResponse.json({ error: "Failed to send configuration" }, { status: 500 })
  }
}

function generateVPNConfig(planType: string, transactionId: string) {
  // Mock configuration generation
  const serverConfigs = {
    basic: {
      server: "basic.privateworkspace.io",
      port: "443",
      speed: "50Mbps",
    },
    pro: {
      server: "pro.privateworkspace.io",
      port: "443",
      speed: "100Mbps",
    },
    premium: {
      server: "premium.privateworkspace.io",
      port: "443",
      speed: "200Mbps",
    },
  }

  const config = serverConfigs[planType as keyof typeof serverConfigs] || serverConfigs.basic

  return {
    configText: `Server: ${config.server}
Port: ${config.port}
Protocol: VMess/VLESS
UUID: ${generateUUID()}
Speed: ${config.speed}
Valid until: ${new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toDateString()}`,
    androidLink: "https://play.google.com/store/apps/details?id=com.v2ray.ang",
    iosLink: "https://apps.apple.com/app/shadowrocket/id932747118",
    windowsLink: "https://github.com/2dust/v2rayN/releases",
  }
}

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
