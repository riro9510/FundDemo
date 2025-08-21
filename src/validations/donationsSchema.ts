import Joi from 'joi';

const donationSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().description("Donor's full name"),
  amount: Joi.number().positive().required().description('Donation amount in MXN'),
  message: Joi.string().optional().max(200).description('Optional message from the donor'),
});

export { donationSchema };
