import { Controller, Post, Body, ValidationPipe,UsePipes } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "@app/dtos";
import { successResponse } from "@app/global-reponse";
@Controller('users')
export class UserController {

    constructor(private readonly usersService: UserService) { }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {

        const response =await this.usersService.register(createUserDto)

        return successResponse(response, 'User registered successfully');
    }

    //can directly handle error using validation pipe without handeling in service
    // @Post('register')
    //
    //
//The { whitelist: true } option in the ValidationPipe configuration is used to strip any properties from the request body that do not have corresponding validation decorators in the DTO class.
//With whitelist: true enabled, only properties that are explicitly defined in your DTO class and decorated with validation decorators (@IsNotEmpty(), @IsEmail(), etc.) will be considered during validation. Any other properties present in the request payload will be ignored.
    // @UsePipes(new ValidationPipe({ whitelist: true })) // Apply validation pipe
    // async register(@Body() createUserDto: CreateUserDto) {
    //   return this.usersService.register(createUserDto);
    // }
}



