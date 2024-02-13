const authRouter = require("express").Router();
const { authJwt } = require("../middlewares/authJWT.js");
const {
  signUp,
  signIn,
  signOut,
  checkEmailExists,
} = require("../controllers/authController");

authRouter.post("/auth/signup", signUp);

authRouter.post("/auth/signin", signIn);

authRouter.post("/signout", [authJwt.verifyToken], signOut);

authRouter.post("/check-email", checkEmailExists);

module.exports = authRouter;
