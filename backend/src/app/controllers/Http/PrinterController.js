/* eslint-disable consistent-return */
const path = require('path');
const fs = require('fs');
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

    let data = `====================\n`;
    data += `COMPROVANTE DE VENDA\n`;
    data += `${shop.name}\n`;
    data += `CPF/CNPJ:${shop.identification}\n`;
    data += `Tel.:${shop.phone}\n`;
    data += `End.:${shop.address}\n`;
    data += `====================\n`;
    data += `CUPOM NAO FISCAL\n`;
    data += `====================\n`;
    data += `Data:${date}\n`;
    data += `--------------------\n`;
    data += `${items}\n`;
    data += `====================\n`;
    data += `Valor total:R$${sale.total.toFixed(2)}\n`;
    data += details ? `Responsavel:${sale.functionary.name}\n` : '\n';
    data += `Forma de pagamento:${sale.payment}\n`;
    data += `====================\n`;
    data += `ID venda:${sale._id}`;

    const dir =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes')
        : process.env.DIR_PRODUCTION;

    await fs.writeFile(`${dir}/${id}.rtf`, data, { encoding: 'utf-8', flag: 'w' }, (err) => {
      if (err) return res.status(400).json(`${err}`);
    });
    const vbs =
      process.env.NODE_ENV === 'test'
        ? path.resolve(__dirname, '..', '..', '..', '..', '__tests__', 'recipes', 'impressao.vbs')
        : process.env.DIR_INITIALIZE_PRINT;

    setTimeout(function () {
      exec(vbs);
    }, 1000);
    return res.status(200).json('success');
  },
};
