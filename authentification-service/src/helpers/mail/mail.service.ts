import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(token: string, email: string) {
    await this.mailerService.sendMail({
      to: 'recipient@example.com',
      subject: 'Verify Email',
      text: 'This is for verify email',
      html: `
        <h1>Verify Email</h1>
        <p>Click <a href="http://localhost:4000/auth/verify-email/${email}/${token}">here</a> to verify your email</p>`,
    });
  }
}
