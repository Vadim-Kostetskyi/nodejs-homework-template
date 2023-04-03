const createError = (status, message) => {
  const error = new Error();
  error.errorMessage = message;
  error.status = status;

  return error;
};

module.exports = createError;
