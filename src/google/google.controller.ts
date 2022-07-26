import { Controller, Get, Res } from '@nestjs/common'
import { GoogleService } from './google.service'
import { Response } from 'express'

@Controller('google')
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Get('pdf')
  async generatePDF(@Res() res: Response): Promise<Response> {
    return this.googleService.getPdfContent('googleSearch', res)
  }
}
