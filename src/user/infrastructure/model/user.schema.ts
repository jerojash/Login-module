import { Schema,model } from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


const UserSchema = new Schema(
    {
        id:{
            type: String,
            require: true,
            unique: true,
            indexedDB: true
        },
        username: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        },
        firstName: {
            type: String,
            require: true
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            require: true,
            unique: true
            
        },

    }
);

UserSchema.plugin(mongooseUniqueValidator,{ message: 'El campo {PATH} debe ser unico.' })

const UserModel = model("users", UserSchema);

export default UserModel;