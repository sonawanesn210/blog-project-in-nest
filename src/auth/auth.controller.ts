import { LoginDto } from "@app/dtos";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { successResponse } from "@app/global-reponse";


@Controller('auth')
export class AuthController{
 constructor (private readonly authService: AuthService
    ){}   

@Post('login')
async login (@Body() loginDto:LoginDto){
  const response= await this.authService.login(loginDto)
  return successResponse(response,'login successfull')
}
}