import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

// very first thing that fires up
// cause it's awkward to have any flickers...
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null; // don't even have a spinner;
};

export default ResolveAuthScreen;
