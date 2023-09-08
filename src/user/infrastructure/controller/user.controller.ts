import { Request, Response } from "express";
import { registerUserDTO } from "../../application/dto/registerUser.dto";
import RegisterUserApplication from "../../application/registerUser";
import { userReturnDTO } from "../../application/dto/registerUserReturn.dto";
import GetUsersApplication from "../../application/getAllUsers";

export default class UserController{
    constructor(private userRegister: RegisterUserApplication<userReturnDTO>,
        private getUsers: GetUsersApplication){
        this.insertUser = this.insertUser.bind(this),
        this.findUsers = this.findUsers.bind(this)
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
        res.send(user.getRight());
        
    }
}