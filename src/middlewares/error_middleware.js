async function ErrorMiddleware(ctx, next) {
  try {
    await next();
  } catch (e) {
    console.log(e);
    ctx.throw(500);
  }
}
                                                
module.exports = {
  ErrorMiddleware
};