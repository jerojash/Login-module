import { Request, Response } from "express";
import { registerUserDTO } from "../../application/dto/registerUser.dto";
import RegisterUserApplication from "../../application/registerUser";
import { registerUserReturnDTO } from "../../application/dto/registerUserReturn.dto";

export default class UserController{
    constructor(private userRegister: RegisterUserApplication<registerUserReturnDTO>){
        this.insertUser = this.insertUser.bind(this)
    }

    public async insertUser({body}: Request, res: Response){

        const dto = new registerUserDTO(body.username,body.password,body.firstName,
                                        body.lastName,body.email)

        const user = await this.userRegister.execute(dto);
        
        if(user.isLeft()) res.status(406).send(user.getLeft().message)
        else res.send(user.getRight())
        
    }
}