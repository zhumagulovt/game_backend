const Joi = require('joi');
const { UserService } = require('../../services');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});


async function signUp(ctx) {
  const data = await bodySchema.validateAsync(ctx.request.body);
  try {
    ctx.body = await UserService.createUser(data.email, data.password);
    ctx.status = 201;
  } catch(e) {
    if (e.code = '23505') {
      ctx.body = 'This email is already in use';
      ctx.status = 400;
      return;
    }

    throw (e);
  }
}

module.exports = {
  signUp
}