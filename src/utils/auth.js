class Auth {
    constructor() {
        const myStorage = window.sessionStorage;
        this.authentication = myStorage.getItem("LoggedIn")? true: false;
    }

    login(cb) {
        this.authentication = true;
        cb();
    }

    logout(cb) {
        this.authentication = false;
        cb();
    }

    isAuthentication() {
        return this.authentication;
    }
}

export default new Auth();