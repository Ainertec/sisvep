import { Request, Response } from 'express';

export class WebsocketController {
  store(request: Request, response: Response) {
    const { destiny, barcode } = request.body;
    const destinySocket = request.connectedUsers[destiny];

    if (destinySocket) {
      request.io.to(destinySocket).emit('barcode', barcode);
    }

    return response.status(200).send();
  }
}
