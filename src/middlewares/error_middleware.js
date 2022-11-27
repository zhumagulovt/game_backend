async function ErrorMiddleware(ctx, next) {
  try {
    await next();
  } catch (e) {
    if (e.isJoi) {
      ctx.body = e;
      ctx.status = 400;
      return;
    }
    console.log(e);
    ctx.throw(500);
  }
}
                                                
module.exports = {
  ErrorMiddleware
};