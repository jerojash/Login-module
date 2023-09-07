import { Either } from "../../generics/Either";
import { registerUserDTO } from "../application/dto/registerUser.dto";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import UserModel from "./model/user.schema";

export class UserAdapterRepository implements IUser<registerUserDTO>{
    async registerUser(user: User): Promise<Either<Error,registerUserDTO>>{
        
        const UserEntity = new registerUserDTO(user.getUsername().getUsername(),
                            user.getPassword().getPassword(),
                            user.getFullName().getFirstName(),
                            user.getFullName().getLastName(),
                            user.getEmail().getEmail(),user.getId().getId(),);

        try {
            const userBD = await UserModel.create(UserEntity);

            return Either.makeRight<Error,registerUserDTO>(UserEntity);
        } catch (error) {

            return Either.makeLeft<Error, registerUserDTO>(new Error(`Error: ${error}`));
        }
        
    }

}