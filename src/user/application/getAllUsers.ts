import { Either } from "../../generics/Either";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import { Id } from "../domain/valueObjects/Id";
import { registerUserDTO } from "./dto/registerUser.dto";

export default class GetUsersApplication{
    private UserRepository: IUser<any>;
    constructor(repo: IUser<any>) {
        this.UserRepository = repo;
    }

    async execute(): Promise<Either<Error,any>>{
        
        let result = this.UserRepository.getAllUsers()
        return result
    }
}