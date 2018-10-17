const path = require('path');
const publicPath = path.join(__dirname, '../public');

const express = require('express');
const app = express();
const hbs = require('hbs');
const port = process.env.PORT || 3000;

app.use((request, response, next) => {
  let now = new Date().toLocaleString()
  console.log(`${now}: ${request.method} '${request.url}'`)
  next();
})

app.use(express.static(publicPath))

app.listen(port, () => console.log('Server listening on port 3000'))


