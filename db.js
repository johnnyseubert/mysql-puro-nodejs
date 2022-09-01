async function connect() {
   if (global.connection && global.connection.state != 'disconnected') {
      return global.connection;
   }

   const mysql = require('mysql2/promise');

   try {
      const connection = await mysql.createConnection(
         'mysql://root:root@localhost:3306/api',
      );
      global.connection = connection;

      return connection;
   } catch (error) {
      return console.log(
         'Erro ao tentar se conectar ao banco de dados: ' + error.message,
      );
   }
}

async function selectCustomers() {
   const conn = await connect();
   const [rows] = await conn.query('SELECT * FROM clientes');
   return await rows;
}

async function insertCustomer(customer) {
   const conn = await connect();
   const sql = 'INSERT INTO clientes(nome,idade) VALUES(?,?)';
   const values = [customer.nome, customer.idade];
   await conn.query(sql, values);
}

async function updateCustomer(c) {
   const conn = await connect();
   const sql = 'UPDATE clientes SET nome = ?, idade = ? WHERE id = ?';
   const values = [c.nome, c.idade, c.id];
   await conn.query(sql, values);
}

async function deleteCustomer(id) {
   const conn = await connect();
   const sql = 'DELETE FROM clientes WHERE id = ?';
   const values = [id];
   await conn.query(sql, values);
}

async function selectMaxCustomerId() {
   const conn = await connect();
   const sql = 'SELECT MAX(id) as maxId FROM clientes';
   const [rows] = await conn.query(sql);
   return rows[0].maxId;
}

module.exports = {
   selectCustomers,
   insertCustomer,
   updateCustomer,
   deleteCustomer,
   selectMaxCustomerId,
};
