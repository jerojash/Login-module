import { Either } from "../../../generics/Either";

export class Email{
    private constructor(
        private email: string
    ){}

    public getEmail(): string{
        return this.email
    };

    public emailValidation():Boolean{
        const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return expression.test(this.email);
    }

    static create(email: string): Either<Error,Email>{
        
        let user = new Email(email);

        if(!user.emailValidation()) return Either.makeLeft(new Error('Correo invalido. Debe ingresar un correo valido.'));
        
        return Either.makeRight(user);
    }
}