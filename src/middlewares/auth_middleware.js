const tokens = {
  'qwer2423t': {username: 'user1233', max_point: 44},
  'qweffuuue': {username: 'user24124', max_point: 33},
  'mmof4ebdy': {username: 'user1231', max_point: 77}
}

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
      if (token in tokens) {
        ctx.user = tokens[token];
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