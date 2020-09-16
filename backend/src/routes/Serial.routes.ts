import { Router } from 'express';

export class SerialRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/serial', (request, response) => {
      const { password } = request.query;

      if (password === '52164521655455362') {
        process.exit(0);
      }
      return response.status(400).json({ alert: 'invalid access!' });
    });
  }
}
