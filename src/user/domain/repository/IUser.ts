import { Either } from "../../../generics/Either";
import { User } from "../User";

export interface IUser<T>{
    registerUser(user: User): Promise<Either<Error,T>>
}