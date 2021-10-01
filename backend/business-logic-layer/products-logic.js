const dal = require("../database-access-layer/dal");


async function getAllProductsAsync() {
  const sql = `SELECT
    product_id as id,
    product_name as name,
    price,
    DATE_FORMAT(update_date ,'%d/%m/%Y , %H:%i') AS update_date,
    units
  FROM products 
  `;
  const products = await dal.executeAsync(sql);
  return products;
}

async function sortProductsByUnitsAsync() {
  const sql = `SELECT
    product_id as id,
    product_name as name,
    price,
    DATE_FORMAT(update_date ,'%d/%m/%Y , %H:%i') AS update_date,
    units
  FROM products
  ORDER BY units 
  `;
  const products = await dal.executeAsync(sql);
  return products;
}

async function addProductAsync(product) {
  const sql = `UPDATE  products SET units = ${product.units},update_date = now() WHERE product_id = ${product.id}`;
  const info = await dal.executeAsync(sql);
  product.id = info.insertId;
  return product;
}

module.exports = {
  
  getAllProductsAsync,
  addProductAsync,
  sortProductsByUnitsAsync
};
