import { Either } from "../../../generics/Either";
import { User } from "../User";
import { Id } from "../valueObjects/Id";

export interface IUser<T>{
    registerUser(user: User): Promise<Either<Error,T>>;
    getAllUsers(limit: number, page: number): Promise<Either<Error,any>>;
}