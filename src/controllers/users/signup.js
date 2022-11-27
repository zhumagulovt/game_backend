const Joi = require('joi');
const { UserService } = require('../../services');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


async function signUp(ctx) {
  const data = await bodySchema.validateAsync(ctx.request.body);

  ctx.body = await UserService.createUser(data.email, data.password);
  ctx.status = 200;
}

module.exports = {
  signUp
}