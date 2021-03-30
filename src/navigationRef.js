// all this to be able to navigate from the reducer/dispatch function
// 214. Navigation from Outside React
// https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15708430#overview
import { NavigationActions } from "react-navigation";

let navigator;

export const setNavigator = (nav) => {
  navigator = nav;
};

// bigger picture, now just import this from a reducer or anything else and call navigate
// i.e. after a successful login, just navigate in a context action instead of doing something callback-y
// pros and cons to both methods
export const navigate = (routeName, params) => {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
};
