/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
const path = require('path');
const fs = require('fs');
const jsRTF = require('jsrtf');
const { format } = require('date-fns');
const { exec } = require('shelljs');
const Sale = require('../../models/Sale');
const Shop = require('../../models/Shop');

function createRecipe(itens) {
  const products = itens.map((item) => {
    return `
Produto:${item.product.name} /quan.:${Number(item.quantity)}
Valor uni.:R$${parseFloat(item.product.price).toFixed(2)} valor tot.:R$${(
      parseFloat(item.product.price) * Number(item.quantity)
    ).toFixed(2)}
    `;
  });
  return products;
}

module.exports = {
  async store(req, res) {
    const { id, details } = req.body;

    const sale = await Sale.findOne({ _id: id }).populate('itens.product').populate('functionary');

    const shop = await Shop.findOne();

    if (!sale) {
      return res.status(400).json({ message: 'Sale does not exist' });
    }

    const items = createRecipe(sale.itens);

    const date = format(sale.createdAt, 'dd/MM/yyyy HH:mm:ss');

    const myDoc = new jsRTF({
      language: jsRTF.Language.BR,
      pageWidth: jsRTF.Utils.mm2twips(58),
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });

    const contentStyle = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      paragraph: true,
    });
    const contentBorder = new jsRTF.Format({
      spaceBefore: 100,
      spaceAfter: 100,
      fontSize: 7,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const header = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 100,
      fontSize: 7,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { size: 2, spacing: 100, color: jsRTF.Colors.GREEN },
    });

    myDoc.writeText('COMPROVANTE DE VENDA', header);
    myDoc.writeText(`${shop.name}`, contentStyle);
    myDoc.writeText(`CPF/CNPJ: ${shop.identification}`, contentStyle);
    myDoc.writeText(`Tel.: ${shop.phone}`, contentStyle);
    myDoc.writeText(`End.: ${shop.address}`, contentBorder);
    myDoc.writeText('CUPOM NÃO FISCAL', contentBorder);
    myDoc.writeText(`Data: ${date}`, contentBorder);
    myDoc.writeText(`${items}`, contentBorder);
    myDoc.writeText(`Valor total: R$${sale.total.toFixed(2)}`, contentStyle);
    details && myDoc.writeText(`Responsavel: ${sale.functionary.name}`, contentStyle);
    myDoc.writeText(`Forma de pagamento: ${sale.payment}`, contentBorder);
    myDoc.writeText(`ID venda: ${sale._id}`, contentStyle);

    const content = myDoc.createDocument();

    const buffer = new Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;

    await fs.writeFile(`${dir}/${id}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, (err) => {
      if (err) return res.status(400).json(`${err}`);
    });

    const vbs =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
        : process.env.DIR_INITIALIZE_PRINT;

    setTimeout(() => {
      exec(vbs);
    }, 1000);
    return res.status(200).json('success');
  },
};
