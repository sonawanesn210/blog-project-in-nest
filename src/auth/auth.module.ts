import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtService } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";

@Module({
imports:[UserModule,
   
],
providers:[AuthService,JwtService],
controllers:[AuthController],
})
export class AuthModule {}