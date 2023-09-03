import React from "react";
import ErrorToast from "../components/ErrorToast/ErrorToast";

const useError = () => {
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3400);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return [error, setError, () => error && <ErrorToast message={error} />];
};

export default useError;
