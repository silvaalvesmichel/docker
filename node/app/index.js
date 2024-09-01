const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

// Configurações de conexão MySQL
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

const createTable = `CREATE TABLE IF NOT EXISTS people (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL)`;
connection.query(createTable);

app.get('/', (req, res) => {
  const insertQuery = `INSERT INTO people(name) VALUES('John Doe')`;
  connection.query(insertQuery);

  connection.query('SELECT * FROM people', (err, results) => {
    if (err) throw err;
    const namesList = results.map(person => `<li>${person.name}</li>`).join('');
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});