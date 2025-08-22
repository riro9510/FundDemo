import Joi from 'joi';

const donationSchema = Joi.object({
  donorName: Joi.string().min(3).max(100).required(),
  donorEmail: Joi.string().email().required(),
  amount: Joi.number().positive().required(),
  currency: Joi.string().optional().default('USD'),
  description: Joi.string().optional().max(500),
  paymentMethod: Joi.string().valid('credit_card', 'paypal', 'bank_transfer', 'other').required(),
  status: Joi.string().valid('pending', 'completed', 'failed').optional().default('pending')
});

export { donationSchema };
