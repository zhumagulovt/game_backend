const Koa = require('koa');
const { router } = require('./router');
const { pool } = require('./pg');
const { createLog, ErrorMiddleware } = require('./middlewares/')

async function main() {
  const app = new Koa();
  const HTTP_PORT = 8080;

  app.use(createLog);
  app.use(ErrorMiddleware);

  // router
  app.use(router.routes());
  
  await pool.query('select 1+1');

  app.listen(HTTP_PORT, () => {
    console.log('Server starts running at port: ', HTTP_PORT);
  });
}

main();