import {JwtPayload, sign, verify} from 'jsonwebtoken';
const jwt_key = process.env.SECRET_KEY || "llave_por_default_15698"

const generateToken = (id: string) => {
    const jwt = sign({ id },jwt_key,{
        expiresIn: "1800s"
    }); //Genero el JWT

    return jwt;

} 

const verifyToken = (jwt: string): JwtPayload => {
    const isOk = verify(jwt, jwt_key) as JwtPayload;
    return isOk;
  };
  
  export {generateToken, verifyToken};