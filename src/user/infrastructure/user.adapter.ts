import { Either } from "../../generics/Either";
import { registerUserDTO } from "../application/dto/registerUser.dto";
import { userReturnDTO } from "../application/dto/registerUserReturn.dto";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import { Id } from "../domain/valueObjects/Id";
import UserModel from "./model/user.schema";
import bcrypt from 'bcrypt';

export class UserAdapterRepository implements IUser<userReturnDTO>{
    async registerUser(user: User): Promise<Either<Error,userReturnDTO>>{
        
        const hashedPassword = await bcrypt.hash(user.getPassword().getPassword(),10);

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
            const users = await UserModel.paginate({},{limit,page,select:"id username firstName lastName email"});;

            return Either.makeRight<Error,any>(users);
        } catch (error) {

            return Either.makeLeft<Error, any>(new Error(`Error: ${error}`));
        }
        
    }

}