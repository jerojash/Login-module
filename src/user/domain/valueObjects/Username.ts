import { Either } from "../../../generics/Either";

export class Username{
    private constructor(
        private username: string
    ){}

    public getUsername(): string{
        return this.username
    };

    public usernameValidation():Boolean{
        const lenght = this.username.length
        return lenght >= 6;
    }

    static create(username: string): Either<Error,Username>{
        let user = new Username(username);

        if(!user.usernameValidation()) return Either.makeLeft(new Error('Username invalido. Debe contener al menos 6 caracteres.'));
        
        return Either.makeRight(user);
    }
}