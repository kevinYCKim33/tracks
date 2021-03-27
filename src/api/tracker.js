import axios from "axios";
import { AsyncStorage } from "react-native";

let url;
if (__DEV__) {
  url = "http://2e47f7361592.ngrok.io"; // npm run ngrok every time I start
} else {
  url = "https://sleepy-savannah-10606.herokuapp.com";
}

const instance = axios.create({
  baseURL: "http://0019a3ed41d4.ngrok.io",
});

instance.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
