async function userProfile(ctx) {
  ctx.status = 200;
  ctx.body = ctx.user;
}

module.exports = {
  userProfile
}
