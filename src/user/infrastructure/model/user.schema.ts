import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import paginate from 'mongoose-paginate-v2';


export const UserSchema = new mongoose.Schema(
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

UserSchema.plugin(mongooseUniqueValidator,{ message: ' El campo {PATH} debe ser unico' });
UserSchema.plugin(paginate);

interface UserDocument extends mongoose.Document{}

//const UserModel = mongoose.model("users", UserSchema);

const UserModel = mongoose.model<
UserDocument,
mongoose.PaginateModel<UserDocument>
>('Users', UserSchema, 'users');

export default UserModel;