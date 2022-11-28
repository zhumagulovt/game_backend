const { UserService } = require('../services');

async function AuthMiddleware(ctx, next) {
  const authToken = ctx.headers.authorization;

  if (authToken === undefined) {
    ctx.status = 401;
    ctx.body = 'You should include Authorization to headers';
    return;
  }

  const parts = ctx.headers.authorization.trim().split(' ');

  if (parts.length === 2) {
    const scheme = parts[0];
    const token = parts[1];

    if (scheme === 'Bearer') {

      const user = await UserService.checkAuthToken(token);
      if (user) {
        ctx.user = user;
        return await next(); 
      }

      ctx.status = 401;
      ctx.body = 'Invalid token';
      return;
    }
  }
  ctx.status = 401;
  ctx.body = 'Bad authorization header format';
  return;
}

module.exports = {
  AuthMiddleware
}