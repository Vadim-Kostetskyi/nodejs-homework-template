const { User } = require("../db/models");

const validationMiddleWare = async (req, res, next) => {
  const model = await new User(req.body);

  try {
    await model.validate();
    console.log("User is valid");
    next();
  } catch (err) {
    res
      .status(400)
      .json({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }
};

module.exports = validationMiddleWare;
