import axios from "axios";
import router from "@/router";

let isErrorShown = false; // Global flag for suppressing duplicate errors

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (!isErrorShown) {
        if (error.response.status === 401) {
          isErrorShown = true;
          alert("Account not logged in properly. Please try again.");
          router.push("/");
        } else if (error.response.status === 403) {
          isErrorShown = true;
          alert(error.response.data.error || "You do not have permission to access this page.");
          router.push("/");
        } else if (error.response.status === 404) {
          alert("The requested resource could not be found.");
        } else if (error.response.status === 500) {
          alert("An internal server error occurred. Please try again later.");
        }
      }
    } else {
      alert("An unexpected error occurred. Please try again later.");
    }

    // Reset flag after a short delay (to allow for navigation)
    setTimeout(() => {
      isErrorShown = false;
    }, 1000);

    return Promise.reject(error);
  }
);