import axios from "axios";
// import { AsyncStorage } from "react-native"; // DEPRECATED!
import AsyncStorage from "@react-native-community/async-storage"; // the updated way

// this __DEV__ logic never got covered in the course!
// let url;
// if (__DEV__) {
//   url = "http://7a29c4b05469.ngrok.io"; // npm run ngrok every time I start
// } else {
//   url = "https://sleepy-savannah-10606.herokuapp.com";
// }

const instance = axios.create({
  baseURL: "http://7a29c4b05469.ngrok.io", // npm run ngrok and replace this...
  // ngrok must be used to provide tunnel from physical device to hit our server
});

// https://www.udemy.com/course/the-complete-react-native-and-redux-course/learn/lecture/15709020#overview
// with every request send the JWT token
instance.interceptors.request.use(
  // gets called for every request
  // specifically for track creation and fetching tracks in this case
  async (config) => {
    // if you've got a token, send it along as a Bearer Token
    // otherwise don't do anything
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // gets called whenever there is an error
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
