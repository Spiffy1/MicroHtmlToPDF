import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common'
import { Response } from 'express'
import { PDF_ERROR_MESSAGE as Err } from '../core'
import * as puppeteer from 'puppeteer'

@Injectable()
export class ConverterService {
  async getPdfContent(website: string, res: Response): Promise<any> {
    const browser = await puppeteer.launch()
    let pdfBuffer: Buffer
    let page: puppeteer.Page = await browser.newPage()
    try {
      await page.goto(website, {
        waitUntil: 'networkidle0',
      })
      pdfBuffer = await page.pdf()
    } catch (err) {
      console.log(err)
      throw new BadRequestException(Err.INVALID_URL)
    } finally {
      await browser.close()
    }

    if (!pdfBuffer) {
      throw new BadRequestException(Err.EMPTY_PDF_BUFFER)
    }

    return new StreamableFile(pdfBuffer).getStream().pipe(res)
  }
}
