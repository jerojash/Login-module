import { Either } from "../../generics/Either";
import { IUser } from "../domain/repository/IUser";

export default class GetUsersApplication{
    private UserRepository: IUser<any>;
    constructor(repo: IUser<any>) {
        this.UserRepository = repo;
    }

    async execute(limit: number, page: number): Promise<Either<Error,any>>{
        
        let result = this.UserRepository.getAllUsers(limit, page)
        return result
    }
}