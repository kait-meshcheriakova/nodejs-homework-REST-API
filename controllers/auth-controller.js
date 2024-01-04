import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import "dotenv/config";
import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.json({
    email: newUser.email,
    subscription: "starter",
  });
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  //   const token = "12.555.222";
  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  res.json({
    token,
    user: { email: email, subscription: user.subscription },
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
