import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Constants } from "../constants/Constants.enum";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private configService: ConfigService, private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext) {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException(Constants.LOGIN_REQUIRED);

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.get("SECRET_KEY")
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException(Constants.LOGIN_REQUIRED);
        }
        return true;


    }

    private extractTokenFromHeader(request: Request) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type == "Bearer" ? token : undefined;
    }

}