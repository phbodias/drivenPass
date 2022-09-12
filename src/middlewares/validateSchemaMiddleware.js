"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchemaMiddleware = void 0;
function validateSchemaMiddleware(schema) {
    return (req, res, next) => {
        const validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            return res.status(422).send(validation.error);
        }
        next();
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
