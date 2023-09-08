import { Either } from "../../../generics/Either";
import { User } from "../User";
import { Id } from "../valueObjects/Id";

export interface IUser<T>{
    registerUser(user: User): Promise<Either<Error,T>>;
    getAllUsers(): Promise<Either<Error,any>>;
}