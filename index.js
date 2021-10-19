const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const productsRouter = require('./routers/productsRouter');
// const sales = require('./routers/salesRouter');

app.use('/products', productsRouter);
// app.use('/sales', sales);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.listen(3000, () => {
  console.log('Escutando na porta 3000');
});
