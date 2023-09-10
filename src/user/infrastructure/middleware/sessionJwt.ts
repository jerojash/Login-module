import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.handler";
declare module "express-session" {
    interface SessionData {
      user_id: string;
    }
  }

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
    const user = verifyToken(`${jwt}`);
    if (!user) {
      res.status(401).send("NO TIENES UN JWT VALIDO");
    } else {
        req.session.user_id = user.id;
      next();
    }
  } catch (e) {
    res.status(401).send("NO AUTORIZADO. SESIÓN NO VALIDA.");
  }
};

export { checkJwt };