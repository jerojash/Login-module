import { Either } from "../../../generics/Either";
import { User } from "../User";

export interface IUser<T>{
    registerUser(user: User): Promise<Either<Error,T>>;
    getAllUsers(limit: number, page: number): Promise<Either<Error,any>>;
    loginUser(username: string, password: string): Promise<Either<Error,any>>;
    profileUser(id: string): Promise<Either<Error,any>>;
}