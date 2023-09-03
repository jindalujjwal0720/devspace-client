import React from "react";
import styles from "./auth.module.css";
import Logo from "../../components/Logo/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../state/context/UserAuthProvider";
import useLoading from "../../hooks/useLoading";
import useError from "../../hooks/useError";

const Register = () => {
  const firstNameRef = React.useRef(null);
  const lastNameRef = React.useRef(null);
  const displayNameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const confirmPasswordRef = React.useRef(null);
  const otpRef = React.useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [token, setToken] = React.useState(null);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [, setIsLoading, Loading] = useLoading();
  const [, setError, Error] = useError();
  const { getOneTimePassword, verifyOneTimePassword, register } = useUserAuth();
  const navigate = useNavigate();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const displayName = displayNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    try {
      const token = await getOneTimePassword({
        firstName,
        lastName,
        displayName,
        email,
        password,
        confirmPassword,
      });
      setToken(token);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    setToken(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const otp = otpRef.current?.value;
    try {
      const verified = await verifyOneTimePassword({ otp, token });
      if (verified) {
        setIsRegistering(true);
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const displayName = displayNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;
        register({
          firstName,
          lastName,
          displayName,
          email,
          password,
          confirmPassword,
        })
          .then((_) => {
            setIsLoading(false);
            navigate("/");
          })
          .catch((err) => {
            setError(err.message);
            setIsLoading(false);
          });
      } else {
        setError("Invalid OTP");
        otpRef.current.value = "";
        setIsLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!passwordRef.current || !confirmPasswordRef.current) return;
    if (showPassword) {
      passwordRef.current.type = "text";
      confirmPasswordRef.current.type = "text";
    } else {
      passwordRef.current.type = "password";
      confirmPasswordRef.current.type = "password";
    }
  }, [showPassword]);

  return (
    <div className={styles.page}>
      <Error />
      <div className={styles.container}>
        <Loading />
        <div className={styles.left}>
          <Logo height={18} />
          <h1 className={styles.heading}>
            {token
              ? isRegistering
                ? "Registering your account..."
                : "Verify your email address"
              : "Create your Devspace Account"}
          </h1>
          <form
            className={styles.form}
            style={{
              display: token ? "flex" : "none",
            }}
          >
            <input
              ref={otpRef}
              type="text"
              name="otp"
              className={styles.input + " " + styles.otp}
              minLength={6}
              maxLength={6}
            />
            <span className={styles.info}>
              Enter the 6-digit code sent to your email address{" "}
              <span style={{ fontWeight: 600 }}>{emailRef.current?.value}</span>
              . If you didn't receive the code, check your spam folder.
            </span>
            <div className={styles.group}>
              <span className={styles.link} onClick={handleGoBack}>
                Back
              </span>
              <button className={styles.button} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
          <form
            className={styles.form}
            style={{
              display: token ? "none" : "flex",
            }}
          >
            <div className={styles.group}>
              <input
                ref={firstNameRef}
                type="text"
                placeholder="First Name"
                name="firstname"
                className={styles.input}
              />
              <input
                ref={lastNameRef}
                type="text"
                placeholder="Last Name(optional)"
                name="lastname"
                className={styles.input}
              />
            </div>
            <input
              ref={displayNameRef}
              type="text"
              placeholder="Display Name"
              name="displayname"
              className={styles.input}
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              name="email"
              className={styles.input}
            />
            <div className={styles.group}>
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                name="password"
                className={styles.input}
              />
              <input
                ref={confirmPasswordRef}
                type="password"
                placeholder="Confirm"
                name="confirmpassword"
                className={styles.input}
              />
            </div>
            <span className={styles.info}>
              Use 8 or more characters with a mix of letters, numbers & symbols
            </span>
            <label htmlFor="showpassword" className={styles.checkbox_label}>
              <input
                type="checkbox"
                name="showpassword"
                id="showpassword"
                className={styles.checkbox}
                onChange={toggleShowPassword}
                checked={showPassword}
              />{" "}
              Show Password
            </label>
            <div className={styles.group}>
              <Link to="/auth/login" className={styles.link}>
                Sign in instead
              </Link>
              <button className={styles.button} onClick={handleNext}>
                Next
              </button>
            </div>
          </form>
        </div>
        <div className={styles.right}></div>
      </div>
    </div>
  );
};

export default Register;
