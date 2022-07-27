import { Body, Controller, Header, Param, Post, Res } from '@nestjs/common'
import { ConverterService } from './converter.service'
import { Response } from 'express'
import { ConvertWebsiteDto } from './dto/create-google.dto'

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('pdf')
  @Header('website', 'none')
  async generatePDF(@Res() res: Response, @Body() website: ConvertWebsiteDto): Promise<Response> {
    return this.converterService.getPdfContent(website.websiteUrl, res)
  }
}
