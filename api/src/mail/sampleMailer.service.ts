import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class SampleMailerService {
  constructor(private readonly mailerService: MailerService) {}

  public sendSimpleMail(): void {
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

  public sendMailWithTemplate(): void {
    this.mailerService
      .sendMail({
        to: 'test@example.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule with ejs template and image', // Subject line
        template: 'testMailTemplate',
        context: {
          username: 'john doe',
        },
        attachments: [
          {
            path: path.join(process.cwd(), 'src/mailtemplates/nestjs-icon.png'),
            cid: 'nestjs-icon-cid',
          },
        ],
      })
      .then(() => console.log('success to send mail.'))
      .catch((error) => console.error('failed to send mail.', error));
  }
}
