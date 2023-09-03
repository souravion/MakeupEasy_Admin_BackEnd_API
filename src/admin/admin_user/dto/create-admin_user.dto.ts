export class CreateAdminUserDto {
    name: string;
    username: string;
    password: string;
    refreshToken?: string;
}
