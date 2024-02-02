import {  Application } from "express";
import { UserAuthentication } from "../controllers/User";
import { isAuthenticated, isOwner } from "../middleware/authenticate";

export class Routes {

    public userAuthentication: UserAuthentication = new UserAuthentication();

    public routes(app: Application): void {
        app.route('/register')
            .post(this.userAuthentication._Registration);
        app.route('/login')
            .post(this.userAuthentication._login)

      
    }
}
