import { Request, Response } from "express";
import { registerUserDTO } from "../../application/dto/registerUser.dto";
import RegisterUserApplication from "../../application/registerUser";
import { userReturnDTO } from "../../application/dto/registerUserReturn.dto";
import GetUsersApplication from "../../application/getAllUsers";
import LoginUserApplication from "../../application/loginUser";
import ProfileUserApplication from "../../application/profileUser";
import { JwtPayload } from "jsonwebtoken";


declare module "express-session" {
    interface SessionData {
      username: string;
      session_status: boolean;
      jwt: string;
      user_id: string;
    }
  }



export default class UserController{
    constructor(
        private userRegister: RegisterUserApplication<userReturnDTO>,
        private getUsers: GetUsersApplication,
        private loginUser: LoginUserApplication,
        private profileUser: ProfileUserApplication
        ){
        this.insertUser = this.insertUser.bind(this),
        this.findUsers = this.findUsers.bind(this),
        this.login = this.login.bind(this),
        this.seeProfile = this.seeProfile.bind(this)
    }

    public async insertUser({body}: Request, res: Response){

        const dto = new registerUserDTO(body.username,body.password,body.firstName,
                                        body.lastName,body.email)

        const user = await this.userRegister.execute(dto);
        
        if(user.isLeft()) res.status(406).send(user.getLeft().message)
        else res.send(user.getRight())
        
    }

    public async findUsers({query}: Request, res: Response){
        const limit = query.limit || "5"
        const page = query.page || "1"

        
        const user = await this.getUsers.execute(parseInt(limit.toString()),parseInt(page.toString()));
        
        if(user.isLeft()) res.status(406).send(user.getLeft().message);
        else res.send(user.getRight());
        
    }

    public async login(req: Request, res: Response){
        
        const user = await this.loginUser.execute(req.body.username,req.body.password);
        if(user.isLeft()) res.status(403).send(user.getLeft().message);
        else{
            if(req.session.session_status == true){
                res.status(200).send({"token": req.session.jwt,"message": "Este token es el último generado. No se ha cerrado la sesión."});
            } else{
                req.session.session_status = true
                req.session.jwt = user.getRight().token;
                res.status(200).send(user.getRight());
            } 
        }
    }

    public async seeProfile(req:Request, res: Response){
        
        if(req.session.session_status == true){
            const user = await this.profileUser.execute(`${req.session.user_id}`);
            res.send(user.getRight());
        } else{
            res.status(403).send("No hay una sesion activa. Inicie sesion e intente de nuevo.");;
        }
        
    }

    public async logout(req:Request, res: Response){
        
        if(req.session.session_status == true){
            req.session.session_status = false
            res.send("Se ha cerrado la sesion");
        } else{
            res.status(400).send("No hay una sesion activa. Inicie sesion e intente de nuevo.");;
        }

    }
}