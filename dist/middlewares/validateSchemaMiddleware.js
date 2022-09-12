"use strict";
exports.__esModule = true;
exports.validateSchemaMiddleware = void 0;
function validateSchemaMiddleware(schema) {
    return function (req, res, next) {
        var validation = schema.validate(req.body, { abortEarly: false });
        if (validation.error) {
            return res.status(422).send(validation.error);
        }
        next();
    };
}
exports.validateSchemaMiddleware = validateSchemaMiddleware;
