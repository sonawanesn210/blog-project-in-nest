import { Document, Schema } from "mongoose";

export interface User extends Document{

    userName: string;
    email: string;
    password: string;
}

//instead of schemma we can also add like
// provides a more traditional Mongoose syntax, which some developers may prefer or find more flexible in certain situations.
// export const UserSchema  =new Schema({
//     userName:{type: "string",required:true},
//     email: { type: String, required: true },
//     password: { type: String, required: true }
// })