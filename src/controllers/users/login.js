const Joi = require('joi');
const { UserService } = require('../../services');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

async function login(ctx) {
  const data = await bodySchema.validateAsync(ctx.request.body);
  var user = {};

  try {
    user = await UserService.checkCredentials(data.email, data.password);
  } catch(e) {
    ctx.status = 400;
    ctx.body = e;
    return;
  }
  const token = await UserService.genereateAuthToken(user.id);
  
  ctx.status = 200;
  ctx.body = {'token': `Bearer ${token}`};
}

module.exports = {
  login
}
