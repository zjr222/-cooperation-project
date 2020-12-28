const express = require('express');
const router = require('./routes');
const app = express();

app.use(router);

app.listen(6003, () => {
  console.log('Listening on port 6003');
});