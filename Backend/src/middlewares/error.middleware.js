import { ErrorResponse } from '../utils/responseHandler.js';

export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const status = err.status || 500;
  return new ErrorResponse(res, err.message || 'Internal Server Error', status);
};
