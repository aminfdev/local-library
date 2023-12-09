import jwt from "jsonwebtoken";

export function authenticate(req,res,next) {
  const accessToken = req.header("Access-Token");
  if (!accessToken) {
    return res.status(401).json({ message: "Access denied." });
  } else {
    try {
      const validToken = jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (error) {
      res.status(401).json({ message: "Access denied." });
    }
  }
}
