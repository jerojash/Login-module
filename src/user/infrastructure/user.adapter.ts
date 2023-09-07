import { Either } from "../../generics/Either";
import { registerUserDTO } from "../application/dto/registerUser.dto";
import { registerUserReturnDTO } from "../application/dto/registerUserReturn.dto";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import UserModel from "./model/user.schema";
import bcrypt from 'bcrypt';

export class UserAdapterRepository implements IUser<registerUserReturnDTO>{
    async registerUser(user: User): Promise<Either<Error,registerUserReturnDTO>>{
        
        const hashedPassword = await bcrypt.hash(user.getPassword().getPassword(),10);

        const UserEntity = new registerUserDTO(user.getUsername().getUsername(),
                            hashedPassword,
                            user.getFullName().getFirstName(),
                            user.getFullName().getLastName(),
                            user.getEmail().getEmail(),user.getId().getId(),);

        try {
            await UserModel.create(UserEntity);

            const UserEntityReturn = new registerUserReturnDTO(user.getUsername().getUsername(),
                            user.getFullName().getFirstName(),
                            user.getFullName().getLastName(),
                            user.getEmail().getEmail(),user.getId().getId(),);

            return Either.makeRight<Error,registerUserReturnDTO>(UserEntityReturn);
        } catch (error) {

            return Either.makeLeft<Error, registerUserReturnDTO>(new Error(`Error: ${error}`));
        }
        
    }

}