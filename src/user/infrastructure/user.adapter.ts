import { Either } from "../../generics/Either";
import { registerUserDTO } from "../application/dto/registerUser.dto";
import { userReturnDTO } from "../application/dto/registerUserReturn.dto";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import { Id } from "../domain/valueObjects/Id";
import UserModel, { UserDocument, UserInterface } from "./model/user.schema";
import bcrypt from 'bcrypt';
import { encrypt, verified } from "./utils/bcrypt.handler";
import mongoose from "mongoose";

export class UserAdapterRepository implements IUser<userReturnDTO>{
    async registerUser(user: User): Promise<Either<Error,userReturnDTO>>{

        const hashedPassword = await encrypt(user.getPassword().getPassword());
        const UserEntity = new registerUserDTO(user.getUsername().getUsername(),
                            hashedPassword,
                            user.getFullName().getFirstName(),
                            user.getFullName().getLastName(),
                            user.getEmail().getEmail(),user.getId().getId(),);

        try {
            await UserModel.create(UserEntity);

            const UserEntityReturn = new userReturnDTO(user.getUsername().getUsername(),
                            user.getFullName().getFirstName(),
                            user.getFullName().getLastName(),
                            user.getEmail().getEmail(),user.getId().getId(),);

            return Either.makeRight<Error,userReturnDTO>(UserEntityReturn);
        } catch (error) {

            return Either.makeLeft<Error, userReturnDTO>(new Error(`Error: ${error}`));
        }
        
    }

    async getAllUsers(limit: number, page: number): Promise<Either<Error,any>>{

        try {
            const users = await UserModel.paginate({},{limit,page,select:"id username firstName lastName email"});
            
            return Either.makeRight<Error,any>(users);
        } catch (error) {

            return Either.makeLeft<Error, any>(new Error(`Error: ${error}`));
        }
        
    }

    async loginUser(username: string, password: string): Promise<Either<Error,any>>{
        const checkUser = await UserModel.findOne({username}).select("id username password firstName lastName email").then()
         
        if(!checkUser) return Either.makeLeft<Error, any>(new Error(`Error: No existe el usuario: ${username} en la base de datos.`));

        const json = <UserDocument>checkUser.toJSON();
        const passwordHashed = json.password;
        const boolean = await verified(password,passwordHashed);

        if (!boolean) return Either.makeLeft<Error, any>(new Error(`Error: Ha ingresado una clave incorrecta`));

        return Either.makeRight<Error,any>(checkUser)
    }

}