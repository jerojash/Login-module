import { Either } from "../../../generics/Either";

export class Password{
    private constructor(
        private password: string
    ){}

    public getPassword(): string{
        return this.password
    };

    public PasswordValidation(): Boolean{
        const expression: RegExp = /^(?=.*\d)(?=.*[-_!@#$%^&*?.])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return expression.test(this.password);
    }

    static create(password: string): Either<Error,Password>{
        let pass = new Password(password);

        if(pass.PasswordValidation()) return Either.makeRight(pass)

        return Either.makeLeft(new Error("Clave invalida. Debe contener mayuscula y un signo especial"))
    }
}