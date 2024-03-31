function checkSchema(schema) {
  return (req, res, next) => {
    const resultOfValidation = schema.validate(req.body);

    if (resultOfValidation.error) {
      return res.status(404).send({ error: resultOfValidation.error.details });
    }

    next();
  };
}

module.exports = { checkSchema };
