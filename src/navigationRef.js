// all this to be able to navigate from the reducer/dispatch function
import { NavigationActions } from "react-navigation";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
