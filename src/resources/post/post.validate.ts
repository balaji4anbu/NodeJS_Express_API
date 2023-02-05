import Joi from 'joi';
const create = Joi.object({
    title: Joi.string().max(8).min(4).required(),
    body: Joi.string().required(),
});

export default { create };