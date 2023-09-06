import { v4 as uuidv4 } from 'uuid';

export class Id{
    private id: string;
    private constructor(id?: string){
        if(id===undefined){
            this.id = uuidv4();
        }else{
            this.id = id;
        }
    }
    getIDNota(): string{
        return this.id;
    }
    static create(id?:string): Id{
        return new Id(id);
    }

    static create2(id:string): Id{
        return new Id(id);
    }

}