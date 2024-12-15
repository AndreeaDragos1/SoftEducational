export const setAuthHeader = (token) => {
    if (token) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
  };
  
  export const getAuthToken = () => {
    return window.localStorage.getItem("auth_token");
  };
  