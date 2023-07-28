const express = require('express');
const bodyParser = require('body-parser');
const { createConnection } = require('typeorm');
const Contact = require('./models/Contact');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
app.use(bodyParser.json());

const port = 8080; 

const typeOrmOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'bitespeed_db',
  entities: [Contact],
  synchronize: true,
};

createConnection(typeOrmOptions)
  .then(() => {
    console.log('Connected to MySQL database');
    // Register contactRoutes
    app.use(contactRoutes);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  });
