const Joi = require('joi');
const { UserService } = require('../../services');

const bodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

async function login(ctx) {
  const data = await bodySchema.validateAsync(ctx.request.body);

  const result = await UserService.loginCheck(data.email, data.password);

}

module.exports = {
  login
}
