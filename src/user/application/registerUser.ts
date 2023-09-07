import { Either } from "../../generics/Either";
import { User } from "../domain/User";
import { IUser } from "../domain/repository/IUser";
import { registerUserDTO } from "./dto/registerUser.dto";

export default class RegisterUserApplication<T>{
    private UserRepository: IUser<T>;
    constructor(repo: IUser<T>) {
        this.UserRepository = repo;
    }

    async execute(dto: registerUserDTO): Promise<Either<Error,T>>{
        
        const user = User.create(dto.firstName,dto.lastName,dto.username,dto.password,dto.email)

        if(user.isLeft()) return Either.makeLeft<Error,T>(new Error(user.getLeft().message))

        let result = this.UserRepository.registerUser(user.getRight())
        return result
    }
}