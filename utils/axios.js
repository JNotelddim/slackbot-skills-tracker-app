const { default: axios } = require("axios");
const jwt = require("jsonwebtoken");

const getJWT = () => {
  const secret = process.env.BOLT_KEY;

  const token = jwt.sign({ foo: "bar" }, secret, {
    algorithm: "HS256",
    expiresIn: "1h",
    issuer: "bolt-app",
  });

  return token;
};

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    // TODO: make jwt renew for each request.
    Authorization: `Bearer ${getJWT()}`,
    "Content-Type": "application/json",
  },
  timeout: 1000,
});

module.exports = {
  axios: axiosInstance,
};
