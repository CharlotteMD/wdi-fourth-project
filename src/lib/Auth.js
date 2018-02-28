class Auth {

  static setToken(token) {
    return localStorage.setItem('token', token);
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }

  static logout() {
    localStorage.removeItem('token');
  }

  static getPayload() {
    const token = this.getToken();
    if(!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
  }

  static getUserId() {
    if(this.isAuthenticated()) {
      return this.getToken().userId;
    }
  }

  static getHotelId() {
    if(this.isAuthenticated()) {
      return this.getToken().hotelId;
    }
  }


}

export default Auth;
