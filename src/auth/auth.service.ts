import { LoginDto } from "@app/dtos";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
      
      
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async login(loginDto: LoginDto): Promise<{ token: string }> {

        const { email, password } = loginDto
        const user = await this.userService.findByEmail(email);
console.log("user: ", user,"await bcrypt.compare(password, user.password", await bcrypt.compare(password, user.password))
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = this.jwtService.sign({ email: user.email }, { secret: 'Blog-Nest' });


        console.log("token: " , token)
        return { token };
    

    }
}