import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { SampleMailerService } from 'src/application/service/sampleMailer.service';

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
