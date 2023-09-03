import React from "react";
import LoadingBar from "../components/LoadingBar/LoadingBar";

const useLoading = () => {
  const [loading, setLoading] = React.useState(false);

  return [loading, setLoading, () => loading && <LoadingBar />];
};

export default useLoading;
