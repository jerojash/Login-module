import { Either } from "../../generics/Either";
import { Email } from "./valueObjects/Email";
import { FullName } from "./valueObjects/FullName";
import { Id } from "./valueObjects/Id";
import { Password } from "./valueObjects/Password";
import { Username } from "./valueObjects/Username";

export class User{
    private constructor(
        private id: Id,
        private full_name: FullName,
        private username: Username,
        private password: Password,
        private email: Email
    ){}

    static create(first_name: string, last_name: string, username: string, password: string, email: string, id?: string, ): Either<Error,User>{

        let id_mvw = Id.create(id);
        let fullname_mvw = FullName.create(first_name,last_name);
        let username_mvw = Username.create(username);
        let password_mvw = Password.create(password);
        let email_mvw = Email.create(email);

        //El email es incorrecto
        if(email_mvw.isLeft()) return Either.makeLeft(email_mvw.getLeft())

        //La clave es incorrecta
        if(password_mvw.isLeft()) return Either.makeLeft(password_mvw.getLeft())        
        
        return Either.makeRight<Error,User>(new User(id_mvw,fullname_mvw,username_mvw,password_mvw.getRight(),email_mvw.getRight()));
    } 

}