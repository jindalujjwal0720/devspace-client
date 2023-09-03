const CustomError = (error) => {
  return Object.assign(new Error(error.message), error);
};

export default CustomError;
