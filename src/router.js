const Router = require('koa-router');

const { AuthMiddleware } = require('./middlewares');

const { signUp } = require('./controllers/users/signup');

const router = new Router();

router.post('/signup', signUp);
  
module.exports = {
  router,
};