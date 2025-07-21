import { Module } from '@nestjs/common';
import { SampleMailerService } from './sampleMailer.service';
import { SampleMailerController } from './sampleMailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import * as path from 'path';

// TODO: Xcodeシミュレーターの起動をOFFにする
// https://www.npmjs.com/package/preview-email#options
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 1025,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'dummy',
          pass: 'dummy',
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },
      template: {
        dir: path.join(process.env.PWD ?? '', 'src/modules/mailtemplates'),
        adapter: new EjsAdapter(),
      },
    }),
  ],
  controllers: [SampleMailerController],
  providers: [SampleMailerService],
})
export class SampleMailerModule {}
