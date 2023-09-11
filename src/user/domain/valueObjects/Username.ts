import { Either } from "../../../generics/Either";

export class Username{
    private constructor(
        private username: string
    ){}

    public getUsername(): string{
        return this.username

    }
    static create(username: string): Either<Error,Username>{
        let user = new Username(username);
        return Either.makeRight(user);
    }
}