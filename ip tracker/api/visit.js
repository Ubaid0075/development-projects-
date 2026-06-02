const nodemailer = require("nodemailer");

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return (
    req.headers["x-real-ip"] ||
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    "unknown"
  );
}

function buildEmailText({ ipAddress, timestamp, userAgent }) {
  return [
    "Visitor access information",
    "",
    `IP Address: ${ipAddress}`,
    `Timestamp: ${timestamp}`,
    `User-Agent: ${userAgent}`
  ].join("\n");
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (!["GET", "POST"].includes(req.method)) {
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const ipAddress = getClientIp(req);
    const timestamp = new Date().toISOString();
    const userAgent = req.headers["user-agent"] || "unknown";

    // Configure these environment variables in Vercel or your local .env file:
    // MAIL_USER = the email account used to send notifications
    // MAIL_PASS = the password or app password for MAIL_USER
    // MAIL_TO   = the destination email address that receives notifications
    const { MAIL_USER, MAIL_PASS, MAIL_TO } = process.env;

    if (!MAIL_USER || !MAIL_PASS || !MAIL_TO) {
      console.error("Missing email environment variables.");
      res.status(500).json({
        ok: false,
        error: "Email configuration is incomplete"
      });
      return;
    }

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      }
    });

    const message = {
      from: MAIL_USER,
      to: MAIL_TO,
      subject: "New visitor access logged",
      text: buildEmailText({ ipAddress, timestamp, userAgent })
    };

    await transport.sendMail(message);

    console.log("Visitor logged and email sent.", {
      ipAddress,
      timestamp,
      userAgent
    });

    res.status(200).json({
      ok: true,
      message: "Visitor recorded"
    });
  } catch (error) {
    console.error("Failed to process visitor log:", error);
    res.status(500).json({
      ok: false,
      error: "Failed to process visitor log"
    });
  }
};
