const Koa = require('koa');

async function main() {
  const app = new Koa();
  const HTTP_PORT = 8080;

  app.listen(HTTP_PORT, () => {
    console.log('Server starts running at port: ', HTTP_PORT);
  });
}

main();