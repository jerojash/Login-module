
export class registerUserDTO {

    constructor(
        public username: string, 
        public password: string,
        public firstName: string,
        public lastName: string, 
        public email: string,
        public id?: string,
        ){};

  }