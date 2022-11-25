const Router = require('koa-router');
  
const { AuthMiddleware } = require('./middlewares');

const router = new Router();
  
router
  .get('/profile', AuthMiddleware, async (ctx) => {
    ctx.body=ctx.user;
  });
  
module.exports = {
  router,
};