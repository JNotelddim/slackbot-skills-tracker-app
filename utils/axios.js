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

const axiosFn = (route, config) => {
  return axios({
    method: "get",
    baseURL: `${process.env.API_URL}${route}`,
    headers: {
      // TODO: make this renew for each request.
      Authorization: `Bearer ${getJWT()}`,
    },
    ...config,
  });
};

module.exports = {
  axios: axiosFn,
};
