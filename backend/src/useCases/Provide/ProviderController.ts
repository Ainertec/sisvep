import { Request, Response } from 'express';
import { ProviderUseCase } from './ProviderUseCase';

export class ProviderController {
  constructor(private providerUseCase: ProviderUseCase) {}

  async store(request: Request, response: Response) {
    const { name, description, phone, email, identification } = request.body;
    try {
      const provider = await this.providerUseCase.createProvider({
        name,
        description,
        phone,
        email,
        identification,
      });
      return response.status(201).json(provider);
    } catch (error) {
      return response.status(400).send({});
    }
  }

  async update(request: Request, response: Response) {
    const { name, description, phone, email, identification } = request.body;
    const id = Number(request.params.id);
    try {
      const provider = await this.providerUseCase.updateProvider({
        name,
        description,
        phone,
        email,
        identification,
        id,
      });
      return response.status(200).json(provider);
    } catch (error) {
      return response.status(400).send({});
    }
  }

  async remove(request: Request, response: Response) {
    const id = Number(request.params.id);
    try {
      const provider = await this.providerUseCase.deleteProvider(id);
      return response.status(200).json(provider);
    } catch (error) {
      return response.status(400).send({});
    }
  }

  async index(request: Request, response: Response) {
    try {
      const providers = await this.providerUseCase.all();
      return response.status(200).json(providers);
    } catch (error) {
      return response.status(400).send({});
    }
  }

  async show(request: Request, response: Response) {
    const { name } = request.params;
    try {
      const providers = await this.providerUseCase.allByName(name);
      return response.status(200).json(providers);
    } catch (error) {
      return response.status(400).send({});
    }
  }
}
