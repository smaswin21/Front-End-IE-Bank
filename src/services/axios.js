import axios from "axios";
import router from "@/router";

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        alert("Session expired. Please log in again.");
        router.push("/");
      } else if (error.response.status === 403) {
        alert(error.response.data.error || "You do not have permission to access this page.");
        router.push("/");
      } else if (error.response.status === 404) {
        alert("The requested resource could not be found.");
      } else if (error.response.status === 500) {
        alert("An internal server error occurred. Please try again later.");
      }
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);

