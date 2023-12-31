import { Either } from "../../generics/Either";
import { IUser } from "../domain/repository/IUser";

export default class ProfileUserApplication{
    private UserRepository: IUser<any>;
    constructor(repo: IUser<any>) {
        this.UserRepository = repo;
    }

    async execute(id: string): Promise<Either<Error,any>>{
        let result = await this.UserRepository.profileUser(id)
        if(result.isLeft()) return Either.makeLeft<Error, any>(result.getLeft())
        return Either.makeRight<Error, any>(result.getRight())
    }
}