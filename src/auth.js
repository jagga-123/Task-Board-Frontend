export const loginUser = (email, password, remember) => {
  if (email === "intern@demo.com" && password === "intern123") {
    const data = { loggedIn: true };
    remember
      ? localStorage.setItem("auth", JSON.stringify(data))
      : sessionStorage.setItem("auth", JSON.stringify(data));
    return true;
  }
  return false;
};

export const logoutUser = () => {
  localStorage.removeItem("auth");
  sessionStorage.removeItem("auth");
};

export const isAuthenticated = () => {
  return (
    localStorage.getItem("auth") || sessionStorage.getItem("auth")
  );
};