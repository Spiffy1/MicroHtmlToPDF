import { Body, Controller, Header, Post, Res } from '@nestjs/common'
import { ConverterService } from './converter.service'
import { Response } from 'express'
import { ConvertWebsiteDto } from './dto/convert-pdf.dto'

@Controller('converter')
export class ConverterController {
  constructor(private readonly converterService: ConverterService) {}

  @Post('pdf')
  @Header('website', 'none')
  async generatePDF(@Res() res: Response, @Body() website: ConvertWebsiteDto): Promise<Response> {
    return this.converterService.getPdfcontent(website.websiteUrl, res)
  }
}
