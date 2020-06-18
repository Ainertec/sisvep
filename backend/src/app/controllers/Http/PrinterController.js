/* eslint-disable no-unused-expressions */
/* eslint-disable new-cap */
/* eslint-disable consistent-return */
const path = require('path');
const fs = require('fs');
const jsRTF = require('jsrtf');
const { eoLocale } = require('date-fns/locale/eo');
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

    const date = format(sale.createdAt, "do 'de' MMMM yyyy", {
      locale: eoLocale,
    });

    const myDoc = new jsRTF({
      // Language: Russian
      language: jsRTF.Language.BR,
      // Set page size: A4 horizontal
      pageWidth: jsRTF.Utils.mm2twips(58),
      // pageHeight : jsRTF.Utils.mm2twips(210),
      // Landscape page format -- which effect it making?
      landscape: false,
      marginLeft: 5,
      marginRight: 2,
    });

    const textFormat = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      bold: true,
      paragraph: true,
      align: 'center',
    });
    const contentStyle = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      paragraph: true,
    });
    const ContentBorder = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      paragraph: true,
      borderBottom: { type: 'single', width: 10 },
    });
    const HeaderBorder = new jsRTF.Format({
      spaceBefore: 20,
      spaceAfter: 20,
      fontSize: 7,
      bold: true,
      paragraph: true,
      align: 'center',
      borderTop: { width: 50, spacing: 100, color: jsRTF.Colors.GREEN },
    });

    myDoc.writeText('COMPROVANTE DE VENDA', HeaderBorder);
    myDoc.writeText(`${shop.name}`, contentStyle);
    myDoc.writeText(`CPF/CNPJ:${shop.identification}`, contentStyle);
    myDoc.writeText(`Tel.:${shop.phone}`, contentStyle);
    myDoc.writeText(`End.:${shop.address}`, ContentBorder);
    // myDoc.writeText('', border);
    myDoc.writeText('CUPOM NAO FISCAL', ContentBorder);
    // myDoc.writeText('', contentStyle);
    myDoc.writeText(`Data:${date}`, ContentBorder);
    // myDoc.writeText(``, border);
    myDoc.writeText(`${items}`, ContentBorder);
    // myDoc.writeText('', border);
    myDoc.writeText(`Valor total:R$${sale.total.toFixed(2)}`, contentStyle);
    details && myDoc.writeText(`Responsavel:${sale.functionary.name}`, contentStyle);
    myDoc.writeText(`Forma de pagamento:${sale.payment}`, ContentBorder);
    // myDoc.writeText('', border);
    myDoc.writeText(`ID venda:${sale._id}`, contentStyle);

    const content = myDoc.createDocument();

    const buffer = new Buffer.from(content, 'binary');

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;

    await fs.writeFile(`${dir}/${id}.rtf`, buffer, { encoding: 'utf-8', flag: 'w' }, (err) => {
      if (err) return res.status(400).json(`${err}`);
    });

    // const vbs =
    //   process.env.NODE_ENV === 'test'
    //     ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
    //     : process.env.DIR_INITIALIZE_PRINT;

    // setTimeout(function () {
    //   exec(vbs);
    // }, 1000);
    return res.status(200).json('success');
  },
};
