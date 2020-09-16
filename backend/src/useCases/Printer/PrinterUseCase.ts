/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import path from 'path';
import fs from 'fs';
import JsRTF from 'jsrtf';
import { format } from 'date-fns';
import { exec } from 'shelljs';
import { IRepository } from '../../repositories/IRepository';
import { Sale } from '../../entity/Sale';
import { Shop } from '../../entity/Shop';

export class PrinterUseCase {
  constructor(
    private repository: IRepository<Sale>,
    private repositoryShop: IRepository<Shop>,
  ) {}

  async store(id: number, details: boolean) {
    const sale = await this.repository.findOne<Sale>({
      where: { id },
      relations: ['itemsSale', 'user'],
    });

    const shop = await this.repositoryShop.findOne<Shop>();

    if (!sale) {
      throw new Error('Sale does not exist');
    }

    const date = format(sale.createdAt, 'dd/MM/yyyy HH:mm:ss');

    const myDoc = new JsRTF({
      language: JsRTF.Language.BR,
      pageWidth: JsRTF.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });

    const contentStyle = new JsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      paragraph: true,
    });
    const contentBorder = new JsRTF.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 7,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new JsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 7,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: JsRTF.Colors.GREEN },
    });

    myDoc.writeText('COMPROVANTE DE VENDA', header);
    myDoc.writeText(`${shop.name}`, contentStyle);
    myDoc.writeText(`CPF/CNPJ: ${shop.identification}`, contentStyle);
    myDoc.writeText(`Tel.: ${shop.phone}`, contentStyle);
    myDoc.writeText(`End.: ${shop.address}`, contentBorder);
    myDoc.writeText('CUPOM NÃO FISCAL', contentBorder);
    myDoc.writeText(`Data: ${date}`, contentBorder);
    sale.itemsSale.map(item => {
      myDoc.writeText(
        `Produto:${item.product.name} /quan.:${item.quantity}`,
        contentBorder,
      );
      myDoc.writeText(
        `Valor uni.:R$${item.product.price.toFixed(2)} valor tot.:R$${(
          item.product.price * item.quantity
        ).toFixed(2)}`,
        contentBorder,
      );
    });

    myDoc.writeText(`Valor total: R$${sale.total.toFixed(2)}`, contentStyle);
    details && myDoc.writeText(`Responsável: ${sale.user.name}`, contentStyle);
    myDoc.writeText(`Forma de pagamento: ${sale.payment}`, contentBorder);
    myDoc.writeText(`ID venda: ${sale.id}`, contentStyle);

    const content = myDoc.createDocument();

    const buffer = Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, 'recipes')
        : process.env.DIR_PRODUCTION;

    await fs.writeFile(
      `${dir}/${id}.rtf`,
      buffer,
      { encoding: 'utf-8', flag: 'w' },
      err => {
        if (err) throw new Error(err.message);
      },
    );

    const vbs =
      process.env.NODE_ENV === 'test'
        ? path.resolve(
            __dirname,
            '..',
            '..',
            '..',
            '..',
            '__tests__',
            'recipes',
            'impressao.vbs',
          )
        : process.env.DIR_INITIALIZE_PRINT;

    setTimeout(() => {
      exec(vbs);
    }, 1000);
  }
}
