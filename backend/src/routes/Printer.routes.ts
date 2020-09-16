import { Router } from 'express';
import { printerController } from '../useCases/Printer';

export class PrinterRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/recipes', (request, response) => {
      return printerController.store(request, response);
    });
  }
}
