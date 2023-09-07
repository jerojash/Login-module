import { Schema,model } from "mongoose";

const UserSchema = new Schema(
    {
        id:{
            type: String,
            require: true,
            unique: true
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
        first_name: {
            type: String,
            require: true
        },
        last_name: {
            type: String
        },
        email: {
            type: String,
            require: true,
            unique: true
            
        },

    }
);

const UserEntity = model("users", UserSchema);

export default UserEntity;