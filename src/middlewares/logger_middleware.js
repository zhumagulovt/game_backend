async function createLog(ctx, next) {
  console.log(ctx.method, ctx.url);

  await next();
}

module.exports = {
  createLog
};