import { Router } from 'express';
import { websocketController } from '../useCases/Websocket';

export class WebsocketRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/providers', (request, response) => {
      return websocketController.store(request, response);
    });
  }
}
