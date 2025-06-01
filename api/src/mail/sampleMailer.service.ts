import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SampleMailerService {
  constructor(private readonly mailerService: MailerService) {}

  public send(): void {
    this.mailerService
      .sendMail({
        to: 'test@example.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => console.log('success to send mail.'))
      .catch((error) => console.error('failed to send mail.', error));
  }
}
