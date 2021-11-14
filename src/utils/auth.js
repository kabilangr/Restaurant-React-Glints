class Auth {
    constructor() {
        const myStorage = window.sessionStorage;
        this.authentication = myStorage.getItem("LoggedInResta");
        console.log(this.authentication)
        const l1 = myStorage.getItem("usernameResta")
        const l2 =myStorage.getItem("userIdResta")
        const l3 =myStorage.getItem("LoggedInResta")
        console.log(l1,l2,l3)
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