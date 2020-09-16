import { Request, Response } from 'express';
import { PrinterUseCase } from './PrinterUseCase';

export class PrinterController {
  constructor(private printerUseCase: PrinterUseCase) {}

  async store(request: Request, response: Response) {
    const { id, details } = request.body;

    try {
      await this.printerUseCase.store(Number(id), Boolean(details));
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
