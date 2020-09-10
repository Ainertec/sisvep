import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Sale } from '../entity/Sale';
import { ItemsSale } from '../entity/ItemsSale';
import { Product } from '../entity/Product';

@EventSubscriber()
export class SaleSubscriber implements EntitySubscriberInterface<ItemsSale> {
  /**
   * Indicates that this subscriber only listen to Post events.
   */
  listenTo() {
    return ItemsSale;
  }

  /**
   * Called before post insertion.
   */
  async afterInsert(event: InsertEvent<ItemsSale>) {
    const product = await event.manager.findOne<Product>('Product', {
      where: { id: event.entity.product },
    });
    product.stock -= event.entity.quantity;
    await event.manager.save(product);
  }
}
