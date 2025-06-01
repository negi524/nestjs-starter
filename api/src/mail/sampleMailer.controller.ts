import { Controller, Get } from '@nestjs/common';
import { SampleMailerService } from './sampleMailer.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('mail')
export class SampleMailerController {
  constructor(private sampleMailerService: SampleMailerService) {}

  /**
   * サンプルメールを送信する
   * @returns メール送信結果
   */
  @Get()
  @ApiOperation({ summary: 'メール送信を行う' })
  sendMail() {
    // this.sampleMailerService.sendSimpleMail();
    this.sampleMailerService.sendMailWithTemplate();
    return 'send mail.';
  }
}
