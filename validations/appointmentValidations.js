import Joi  from "joi";

export const appointmentSchema = Joi.object({
    title: Joi.string().email().required(),
    start: Joi.date().min("now"),
    end: Joi.date().required()
})

