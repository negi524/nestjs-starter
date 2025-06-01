import { Module } from '@nestjs/common';
import { SampleMailerService } from './sampleMailer.service';
import { SampleMailerController } from './sampleMailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      // transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      transport: {
        hsot: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'hoge',
          pass: 'fuga',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      preview: true,
      template: {
        dir: __dirname + '/templates',
        adapter: new EjsAdapter({
          inlineCssEnabled: false,
        }),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [SampleMailerController],
  providers: [SampleMailerService],
})
export class SampleMailerModule {}
