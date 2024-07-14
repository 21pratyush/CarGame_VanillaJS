const asyncHandler = (requestHandler) => {
  return (err, res, next) => {
    Promise.resolve(requestHandler(err, res, next)).
    catch((err) => next(err));
  };
};

export {asyncHandler};
