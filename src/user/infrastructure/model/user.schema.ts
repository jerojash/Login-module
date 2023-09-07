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
            required: [true, "El campo username es obligatorio"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "El campo password es obligatorio"],
        },
        firstName: {
            type: String,
            required: [true, "El campo firstName es obligatorio"],
        },
        lastName: {
            type: String
        },
        email: {
            type: String,
            required: [true, "El campo email es obligatorio"],
            unique: true
            
        },

    }
);

UserSchema.plugin(mongooseUniqueValidator,{ message: ' El campo {PATH} debe ser unico' })

const UserModel = model("users", UserSchema);

export default UserModel;