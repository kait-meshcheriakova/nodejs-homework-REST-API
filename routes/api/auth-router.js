import express from "express";
import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  subscriptionSchema,
} from "../../models/User.js";
import authController from "../../controllers/auth-controller.js";
const authRouter = express.Router();
authRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  authController.signup
);
authRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  authController.signin
);
authRouter.post("/signout", authenticate, authController.signout);
authRouter.get("/current", authenticate, authController.getCurrent);
authRouter.patch(
  "/users",
  validateBody(subscriptionSchema),
  authController.updateSubscription
);
export default authRouter;
