const Router = require('koa-router');

const { AuthMiddleware } = require('./middlewares');

const { signUp } = require('./controllers/users/signup');
const { login } = require('./controllers/users/login');
const { userProfile } = require('./controllers/users/userProfile');

const router = new Router();

router
  .post('/signup', signUp)
  .post('/login', login)
  .get('/profile', AuthMiddleware, userProfile);
  
module.exports = {
  router,
};