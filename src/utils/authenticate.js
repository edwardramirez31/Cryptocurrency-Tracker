export const handleAuthentication = (data) => {
  if (data.token) {
    // const currentDate = new Date().toUTCString().slice(5, -4);
    // const isTokenAvailable = new Date(currentDate) < new Date(data.expiry);
    const currentDate = new Date();
    const isTokenAvailable = currentDate < new Date(data.expiry);
    return { ...data, isAuthenticated: isTokenAvailable };
  }

  return {
    ...data,
    isAuthenticated: false,
  };
};

export const getUserData = () => {
  const userData = window.localStorage.getItem("userData");

  return {
    token: window.localStorage.getItem("token"),
    expiry: window.localStorage.getItem("expiry"),
    userData: JSON.parse(userData),
  };
};

export const logoutStorageHandler = () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userData");
  window.localStorage.removeItem("expiry");
};

export const saveAuthStorageHandler = ({ user, expiry, token }) => {
  window.localStorage.setItem("token", token);
  window.localStorage.setItem("userData", JSON.stringify(user));
  window.localStorage.setItem("expiry", expiry);
};
