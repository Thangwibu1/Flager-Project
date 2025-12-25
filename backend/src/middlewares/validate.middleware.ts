import { NextFunction, Response, Request } from 'express';
import z, { ZodError } from 'zod';
import { BadRequestError } from '../errors/api/ApiError';
const validateBody = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if(error instanceof ZodError){
                throw new BadRequestError(error.issues[0].message);
            }
            next(error);
        }
    };
};
const validateQuery = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.query);
            next();
        } catch (error) {
            if(error instanceof ZodError){
                throw new BadRequestError(error.issues[0].message);
            }
            next(error);
        }
    };
};
export {
  validateBody, validateQuery
}