import { BadRequestException, Injectable, StreamableFile } from '@nestjs/common'
import axios, { AxiosError } from 'axios'
import * as pdf from 'html-pdf-node-ts'
import { Response } from 'express'
import { GOOGLEDOMAIN } from './constants'
import { PDF_ERROR_MESSAGE as Err } from '../core'

@Injectable()
export class GoogleService {
  async getPdfContent(filename: string, res: Response): Promise<any> {
    const htmlString = await this.getHtmlContent(GOOGLEDOMAIN)

    if (!htmlString) {
      throw new BadRequestException(Err.CANT_GET_HTML_CONTENT)
    }
    res.set({
      'Content-type': 'application/pdf',
    })

    const pdfBuffer = await this.convertHtmlToPdf(htmlString, filename)

    if (!pdfBuffer) {
      throw new BadRequestException(Err.EMPTY_PDF_BUFFER)
    }

    return new StreamableFile(pdfBuffer).getStream().pipe(res)
  }

  async getHtmlContent(url: string): Promise<string | undefined> {
    return axios
      .get(url)
      .then((res) => res.data)
      .catch((error: AxiosError) => {
        console.error(`There was an error with ${error.config.url}.`)
        console.error(error.toJSON())
      })
  }

  async convertHtmlToPdf(htmlContent: string, filename: string): Promise<any> {
    const nameOfFile = `${filename}.pdf`

    let file = { content: htmlContent, name: nameOfFile }

    return pdf.generatePdf(file).then((pdfBuffer) => {
      return pdfBuffer
    })
  }
}
