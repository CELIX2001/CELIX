const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Product (
    ProductID INT NOT NULL AUTO_INCREMENT,
    ProductName VARCHAR(100) NOT NULL,
    ProductDescription TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Stock INT NOT NULL,
    CONSTRAINT productPK PRIMARY KEY(ProductID)
  );`;

  await con.query(sql);
}

async function productExists(product) {
  let sql = `
    SELECT * FROM Product
    WHERE ProductName = "${product.ProductName}";
  `;
  return await con.query(sql);
}

async function addProduct(product) {
  let existingProduct = await productExists(product);
  if (existingProduct.length > 0) throw Error("Product already exists.");

  let sql = `
    INSERT INTO Product (ProductName, ProductDescription, Price, Stock)
    VALUES ("${product.ProductName}", "${product.ProductDescription}", ${product.Price}, ${product.Stock});
  `;
  await con.query(sql);
  return await getProduct(product);
}

async function getProduct(product) {
  let sql = `
    SELECT * FROM Product
    WHERE ProductName = "${product.ProductName}";
  `;
  let existingProduct = await con.query(sql);
  if (!existingProduct[0]) throw Error("Product does not exist!");
  return existingProduct[0];
}

async function updateProduct(product) {
  let sql = `
    UPDATE Product
    SET ProductDescription="${product.ProductDescription}", Price=${product.Price}, Stock=${product.Stock}
    WHERE ProductName="${product.ProductName}";
  `;
  await con.query(sql);

  let updatedProduct = await getProduct(product);
  return updatedProduct;
}

async function deleteProduct(product) {
  let sql = `
    DELETE FROM Product
    WHERE ProductName="${product.ProductName}";
  `;
  await con.query(sql);
}

async function getAllProducts() {
  let sql = `SELECT * FROM Product;`;
  return await con.query(sql);
}

module.exports = { getAllProducts, addProduct, getProduct, updateProduct, deleteProduct };
