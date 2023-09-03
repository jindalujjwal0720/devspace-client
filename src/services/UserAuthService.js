import axios from "axios";
import CustomError from "../utils/error";

class UserAuthService {
  constructor() {
    axios.defaults.baseURL =
      (process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api") +
      "/idp/auth";
  }

  validateUserRegistrationRequiredData = ({
    firstName,
    displayName,
    email,
    password,
    confirmPassword,
  }) => {
    if (!firstName || !displayName || !email || !password || !confirmPassword)
      throw new Error("Missing required fields");
    if (password.length < 8)
      throw new Error("Password must be at least 8 characters long");
    const passwordRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    if (!passwordRegex.test(password))
      throw new Error(
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      );
    if (password !== confirmPassword) throw new Error("Passwords do not match");
  };

  getOneTimePassword = async ({
    firstName,
    lastName,
    displayName,
    email,
    password,
    confirmPassword,
  }) => {
    this.validateUserRegistrationRequiredData({
      firstName,
      displayName,
      email,
      password,
      confirmPassword,
    });

    return axios
      .post("/send-otp", {
        user: {
          firstName,
          lastName,
          displayName,
          email,
          password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw CustomError(err.response.data);
      });
  };

  verifyOneTimePassword = async ({ token, otp }) => {
    return axios
      .post("/verify-otp", {
        token,
        otp,
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw CustomError(err.response.data);
      });
  };

  register = async ({
    firstName,
    lastName,
    displayName,
    email,
    password,
    confirmPassword,
  }) => {
    this.validateUserRegistrationRequiredData({
      firstName,
      displayName,
      email,
      password,
      confirmPassword,
    });

    return axios
      .post("/register", {
        user: {
          firstName,
          lastName,
          displayName,
          email,
          password,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw CustomError(err.response.data);
      });
  };
}

const userAuthService = new UserAuthService();
export default userAuthService;
