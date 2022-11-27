const Router = require('koa-router');

const { AuthMiddleware } = require('./middlewares');

const { signUp } = require('./controllers/users/signup');
const { login } = require('./controllers/users/login');

const router = new Router();

router
  .post('/signup', signUp)
  .post('/login', login);
  
module.exports = {
  router,
};