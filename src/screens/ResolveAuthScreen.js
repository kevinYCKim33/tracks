import { useEffect, useContext } from "react";
import { Context as AuthContext } from "../context/AuthContext";

// very first thing that fires up
// cause it's awkward to have any flickers...

// show nothing until you tryLocalSignin
const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignin(); // will either end up in Sign up or TrackList after this
  }, []);

  return null; // don't even have a spinner;
};

export default ResolveAuthScreen;
