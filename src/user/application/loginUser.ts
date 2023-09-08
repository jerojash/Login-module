import { Either } from "../../generics/Either";
import { IUser } from "../domain/repository/IUser";

export default class LoginUserApplication{
    private UserRepository: IUser<any>;
    constructor(repo: IUser<any>) {
        this.UserRepository = repo;
    }

    async execute(username: string, password: string): Promise<Either<Error,any>>{
        
        let result = this.UserRepository.loginUser(username, password)
        return result
    }
}