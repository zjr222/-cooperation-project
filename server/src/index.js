const express = require('express');
const router = require('./routes');
const app = express();

app.use(router);

require('./utils/spider')

app.listen(6003, () => {
  console.log('Listening on port http://localhost:6003');
});
