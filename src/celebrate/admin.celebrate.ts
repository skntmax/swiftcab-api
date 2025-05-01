import BodyParser from 'body-parser';
import { celebrate, Joi, errors, Segments } from 'celebrate';

export const adminCelebrate = {
    roleBasedUser :  celebrate({
            [Segments.BODY]: Joi.object().keys({
              user_id: Joi.number().required(),
              pn: Joi.number().optional(),
              limit: Joi.number().optional(),
            }),
          }),
    }