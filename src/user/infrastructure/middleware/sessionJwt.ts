import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt.handler";
declare module "express-session" {
    interface SessionData {
      user_id: string; //Aca se almacenará el id que viene desde el payload del jwt
      jwt: string; //En esta variable se guardara el jwt de la ultima session iniciada
    }
  }

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwtHeader = req.headers.authorization || "";
    const jwt = jwtHeader.split(" ").pop(); // 11111
    const user = verifyToken(`${jwt}`);
    const boolean = req.session.jwt == jwt;
    if (!user) {
      res.status(401).send("NO TIENES UN JWT VALIDO");
    } else if (boolean){
        req.session.user_id = user.id;
        next();
    } else res.status(401).send("EL TOKEN NO ES VALIDO PARA ESTA SESION INICIADA.");
  } catch (e) {
    res.status(401).send("NO AUTORIZADO. SESIÓN NO VALIDA.");
  }
};

export { checkJwt };