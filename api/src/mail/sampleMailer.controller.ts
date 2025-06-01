import { Controller, Get } from '@nestjs/common';
import { SampleMailerService } from './sampleMailer.service';

@Controller('mail')
export class SampleMailerController {
  constructor(private sampleMailerService: SampleMailerService) {}

  /**
   * サンプルメールを送信する
   * @returns メール送信結果
   */
  @Get()
  sendMail() {
    console.log('send mail.');
    return 'send mail.';
  }
}
