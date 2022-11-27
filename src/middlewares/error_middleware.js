async function ErrorMiddleware(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e.isJoi) {
      ctx.body = e;
      ctx.status = 400;
      return;
    }
    e.status = e.statusCode || e.status || 500;
    throw e;
  }
}
                                                
module.exports = {
  ErrorMiddleware
};