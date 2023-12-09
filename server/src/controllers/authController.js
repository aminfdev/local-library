import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { users } from "../db/users.js";

export async function register(req, res) {
  const user = req.body;
  try {
    const existingUser = users.find((usr) => usr.email == user.email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email is already exist." });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      users.push({
        id: uuidv4(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: hashedPassword,
      });
      const newUser = users.find((usr) => usr.email == user.email);
      const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET);
      return res.status(200).json({
        message: "Registered succesfuly.",
        accessToken: accessToken,
        usr: {
          id: newUser.id,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}

export async function login(req, res) {
  try {
    const user = users.find((usr) => usr.email == req.body.email);
    if (!user) {
      return res.status(404).json({ message: "User not exist." });
    } else {
      const passwordValidation = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!passwordValidation) {
        return res
          .status(400)
          .json({ message: "Email or password not matched." });
      } else {
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return res.status(200).json({
          message: "Logged in successfuly.",
          accessToken: accessToken,
          usr: {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          },
        });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something happened wrong. Try again." });
  }
}
