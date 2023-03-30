import axiosLib from "axios";
import jwt from "jsonwebtoken";

/**
 * To ensure only requests from this app are being accepted by the API,
 * we're signing all of them with a Json Web Token using a symmetric / secret-key
 * algorithm.
 */
const getJWT = (body = {}) => {
  const secret = process.env.BOLT_KEY;

  if (!secret) {
    console.error("missing secret: BOLT_KEY");
    return;
  }

  const token = jwt.sign(body, secret, {
    algorithm: "HS256",
    expiresIn: "2m",
    issuer: "bolt-app",
  });

  return token;
};

/**
 * To ensure all the requests are consistently pointed at the API,
 * we configure this axios instance, and use the instance throughout the app.
 */
const axiosInstance = axiosLib.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

/**
 * Need to ensure the requests are sent with valid tokens.
 * If I only sign the token on the initialization of the axiosInstance, the
 * token will inevitably expire and all requests to the API will fail.
 * So, with this interceptor, I can add an authorization header with a fresh JWT
 * on each request.
 */
axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${getJWT(config.data)}`;
    return config;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("Axios Error", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
