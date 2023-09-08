import { userReturnDTO } from "./registerUserReturn.dto";

export class registerUserDTO extends userReturnDTO{

    public username!: string; 
    public password: string;
    public firstName!: string;
    public lastName!: string; 
    public email!: string;
    public id?: string;
    constructor(
         username: string, password: string, firstName: string, lastName: string,  
         email: string, id?: string
        ){
        super(username,firstName,lastName,email,id);
        this.password = password;
    };

}