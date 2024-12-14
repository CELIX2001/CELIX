const con = require("./db_connect");

async function createTable() {
  let sql = `CREATE TABLE IF NOT EXISTS Customer (
    CustomerID INT NOT NULL AUTO_INCREMENT,
    FullName VARCHAR(100) NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Email VARCHAR(100) NOT NULL UNIQUE,
    PhoneNumber VARCHAR(15),
    Password VARCHAR(255) NOT NULL,
    CONSTRAINT customerPK PRIMARY KEY(CustomerID)
  );`;

  await con.query(sql);
}

createTable();


async function customerExists(customer) {
  let sql = `
    SELECT * FROM Customer
    WHERE Username = "${customer.Username}";
  `;
  return await con.query(sql);
}

async function login(customer) {
  let existingCustomer = await customerExists(customer);
  if (!existingCustomer[0]) throw Error("Username does not exist!");
  if (existingCustomer[0].Password !== customer.Password) throw Error("Password incorrect!");

  return existingCustomer[0];
}

async function register(customer) {
  let existingCustomer = await customerExists(customer);
  if (existingCustomer.length > 0) throw Error("Username already in use.");

  let sql = `
    INSERT INTO Customer (FullName, Username, Email, PhoneNumber, Password)
    VALUES ("${customer.FullName}", "${customer.Username}", "${customer.Email}", "${customer.PhoneNumber}", "${customer.Password}");
  `;
  await con.query(sql);
  return await login(customer);
}

async function updateEmail(customer) {
  let sql = `
    UPDATE Customer SET Email="${customer.Email}"
    WHERE Username="${customer.Username}";
  `;
  await con.query(sql);

  let updatedCustomer = await customerExists(customer);
  return updatedCustomer[0];
}

async function deleteAccount(customer) {
  let sql = `
    DELETE FROM Customer
    WHERE Username="${customer.Username}";
  `;
  await con.query(sql);
}

async function getAllCustomers() {
  let sql = `SELECT * FROM Customer;`;
  return await con.query(sql);
}

module.exports = { getAllCustomers, login, register, updateEmail, deleteAccount };
