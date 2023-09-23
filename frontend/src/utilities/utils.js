export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    // logic to validate the token as needed
    return !!token;
  };