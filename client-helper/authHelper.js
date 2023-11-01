
export const setTokenInLocal= (token) => {

    localStorage.setItem("jwtToken",JSON.stringify(token));
}

export const getTokenFromLocal = () => {
    if (typeof localStorage !== 'undefined') {
        const token= localStorage.getItem("jwtToken") || 0;
        return JSON.parse(token);
      } else {
        return 0; // Handle the case when localStorage is not available
      }
}

export const removeTokenFromLocalMeansLogout = () => {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem('userDetails');

}