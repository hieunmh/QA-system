import Axios from "axios";
import { API_URL } from "./apiEndPoints";

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
  },
});

export default axios;