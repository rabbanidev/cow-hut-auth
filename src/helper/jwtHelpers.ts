import jwt, { Secret } from 'jsonwebtoken';

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret);
};

export const jwtHelpers = {
  createToken,
  verifyToken,
};
