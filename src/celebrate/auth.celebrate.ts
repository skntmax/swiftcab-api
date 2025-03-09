import BodyParser from 'body-parser';
import { celebrate, Joi, errors, Segments } from 'celebrate';



export const authCelebrate = {
    signup :  celebrate({
            [Segments.BODY]: Joi.object().keys({
              email: Joi.string().required(),
              password: Joi.string().required(),
              username: Joi.string().required(),
              userType: Joi.number().required(),
              trafficBy:Joi.string().optional()
            }),
          }),

          login :  celebrate({
            [Segments.BODY]: Joi.object().keys({
              emailOrUsername: Joi.string().required(),
              password: Joi.string().required(),
              userType:Joi.number().required()
            }),
          })    
}