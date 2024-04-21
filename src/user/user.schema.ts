

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Document } from 'mongoose'

@Schema()

export class User extends Document { //User that extends another class named Document.
//By using the extends keyword, the User class inherits properties and methods from another class named Document. In this case, User inherits from the Document class.

    @Prop({ required: true })
    userName: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);