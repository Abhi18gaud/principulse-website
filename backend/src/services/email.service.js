const nodemailer = require('nodemailer');
const { logger } = require('@/utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendVerificationEmail(email, token) {
    try {
      const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;
      
      const mailOptions = {
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Principulse Account',
        html: `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center;">
              <h1 style="color: white; margin: 0 0 20px 0;">Welcome to Principulse! 🎓</h1>
              <p style="color: white; font-size: 16px; margin: 0 0 30px 0;">
                Thank you for registering with Principulse. Please click the button below to verify your email address.
              </p>
              <a href="${verificationUrl}" 
                 style="background: white; color: #667eea; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                Verify Email Address
              </a>
              <p style="color: white; font-size: 14px; margin: 30px 0 0 0;">
                This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
              </p>
            </div>
          </div>
        `
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`✅ Verification email sent to ${email}: ${result.messageId}`);
      return { success: true, messageId: result.messageId };
      
    } catch (error) {
      logger.error(`❌ Failed to send verification email to ${email}:`, error);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new EmailService();
