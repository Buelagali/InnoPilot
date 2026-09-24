const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.host = process.env.EMAIL_HOST;
    this.port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
    this.user = process.env.EMAIL_USER;
    this.password = process.env.EMAIL_PASSWORD;
    this.from = process.env.EMAIL_FROM || 'InnoPilot <no-reply@innopilot.dev>';
  }

  isConfigured() {
    return Boolean(this.host && this.user && this.password);
  }

  getTransporter() {
    if (!this.isConfigured()) {
      return null;
    }

    return nodemailer.createTransport({
      host: this.host,
      port: this.port,
      secure: this.port === 465,
      auth: {
        user: this.user,
        pass: this.password,
      },
    });
  }

  async sendPasswordResetEmail({ toEmail, userName, resetToken }) {
    const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    const resetUrl = `${clientUrl}/reset-password/${resetToken}`;

    const subject = 'InnoPilot — Password Reset Request';
    const textContent = `Hello ${userName || 'Researcher'},\n\nYou requested a password reset for your InnoPilot account.\nPlease click the link below to set a new password:\n\n${resetUrl}\n\nThis link will expire in 15 minutes.\nIf you did not request this reset, please ignore this email.\n\n— The InnoPilot Team`;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #090d16; color: #f1f5f9; margin: 0; padding: 24px; }
    .card { max-width: 520px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
    .logo { color: #818cf8; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 24px; display: inline-block; }
    h1 { font-size: 20px; color: #ffffff; margin-top: 0; margin-bottom: 12px; }
    p { font-size: 14px; color: #94a3b8; line-height: 1.6; margin: 0 0 16px; }
    .button-container { text-align: center; margin: 28px 0; }
    .btn { display: inline-block; background: linear-gradient(135deg, #4f46e5, #7c3aed); color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 12px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 16px rgba(79, 70, 229, 0.4); }
    .expiry { font-size: 12px; color: #f59e0b; background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.2); padding: 10px 14px; border-radius: 8px; margin-bottom: 20px; }
    .fallback { word-break: break-all; font-size: 11px; color: #64748b; background: #020617; padding: 10px; border-radius: 8px; }
    .footer { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; margin-top: 24px; font-size: 11px; color: #64748b; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">⚡ InnoPilot AI</div>
    <h1>Password Reset Request</h1>
    <p>Hello ${userName || 'Researcher'},</p>
    <p>We received a request to reset the password for your InnoPilot account. Click the button below to choose a new password.</p>
    
    <div class="expiry">
      ⏱️ <strong>Security Notice:</strong> This password reset link will expire in <strong>15 minutes</strong> and can only be used once.
    </div>

    <div class="button-container">
      <a href="${resetUrl}" class="btn" target="_blank">Reset My Password</a>
    </div>

    <p style="font-size: 12px; margin-bottom: 8px;">If the button doesn't work, copy and paste this link into your browser:</p>
    <div class="fallback">${resetUrl}</div>

    <p style="font-size: 12px; margin-top: 20px; color: #64748b;">If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>

    <div class="footer">
      InnoPilot — Full-Stack AI Project Discovery & Innovation Platform<br>
      Automated Security Notification
    </div>
  </div>
</body>
</html>
    `;

    const transporter = this.getTransporter();

    if (transporter) {
      try {
        await transporter.sendMail({
          from: this.from,
          to: toEmail,
          subject,
          text: textContent,
          html: htmlContent,
        });
        console.log(`📧 Password reset email dispatched to ${toEmail}`);
      } catch (err) {
        console.error(`❌ Failed to dispatch email via SMTP: ${err.message}`);
        console.log(`🔗 [Development Reset Link]: ${resetUrl}`);
      }
    } else {
      console.log(`\n======================================================`);
      console.log(`📧 [EMAIL SIMULATION] Password Reset Requested for: ${toEmail}`);
      console.log(`🔗 RESET URL: ${resetUrl}`);
      console.log(`⏳ EXPIRES IN: 15 minutes`);
      console.log(`======================================================\n`);
    }

    return { success: true, resetUrl };
  }
}

module.exports = new EmailService();
