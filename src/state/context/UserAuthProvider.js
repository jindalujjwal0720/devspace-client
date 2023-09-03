import React from "react";
import userAuthService from "../../services/UserAuthService";

const UserAuthContext = React.createContext();

export const useUserAuth = () => React.useContext(UserAuthContext);

const UserAuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const getOneTimePassword = async ({
    firstName,
    lastName,
    displayName,
    email,
    password,
    confirmPassword,
  }) => {
    return userAuthService
      .getOneTimePassword({
        firstName,
        lastName,
        displayName,
        email,
        password,
        confirmPassword,
      })
      .then((data) => {
        if (data.token) {
          return data.token;
        } else {
          throw new Error("Failed to get one time password");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const verifyOneTimePassword = async ({ token, otp }) => {
    return userAuthService
      .verifyOneTimePassword({
        token,
        otp,
      })
      .then((data) => {
        if (data.verified) {
          return data.verified;
        } else {
          throw new Error("Failed to verify one time password");
        }
      })
      .catch((err) => {
        throw err;
      });
  };

  const register = async ({
    firstName,
    lastName,
    displayName,
    email,
    password,
    confirmPassword,
  }) => {
    return userAuthService
      .register({
        firstName,
        lastName,
        displayName,
        email,
        password,
        confirmPassword,
      })
      .then((data) => {
        if (data.accessToken) {
          localStorage.setItem("user", JSON.stringify(data));
        }
        return data;
      })
      .catch((err) => {
        throw err;
      });
  };

  const value = {
    user,
    setUser,
    getOneTimePassword,
    verifyOneTimePassword,
    register,
  };
  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
