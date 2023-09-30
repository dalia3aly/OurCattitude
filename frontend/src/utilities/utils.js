export const isUserLoggedIn = () => {
    const token = localStorage.getItem('token');
    // needs clean up later to be inline with user validation logic
    return !!token;
  };