import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./user.schema";
import { CreateUserDto } from "@app/dtos";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

  async register(createUserDto: CreateUserDto): Promise<User> {
    this.validateUserInput(createUserDto)

    const existingEmail = await this.userModel.findOne({ email: createUserDto.email })
    if (existingEmail) {
      throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await bcrypt.hash(createUserDto.password, 10)

    const createdUser = new this.userModel({
      userName: createUserDto.userName,
      email: createUserDto.email,
      password: hashPassword,
    })
    return await createdUser.save();

  }

  private validateUserInput(createUserDto: CreateUserDto): any {
    if (!createUserDto.userName) {
      throw new HttpException('Username is required', HttpStatus.BAD_REQUEST);
    }
    if (!createUserDto.email) {
      throw new HttpException('Email is required', HttpStatus.BAD_REQUEST);
    }

    if (!this.isValidEmailFormat(createUserDto.email)) {
      throw new HttpException('Invalid email format', HttpStatus.BAD_REQUEST);
    }



    if (!createUserDto.password) {
      throw new HttpException('Password is required', HttpStatus.BAD_REQUEST);
    }

    if (!this.isValidPassword(createUserDto.password)) {
      throw new HttpException('Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 6 characters long', HttpStatus.BAD_REQUEST);
    }

  }
  private isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{6,}$/;
    return passwordRegex.test(password);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
}
}