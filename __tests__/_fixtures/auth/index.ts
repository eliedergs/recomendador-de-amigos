import AuthService from '@/services/AuthService';

export class AuthMock {
    static async createToken(userId: string) {
        return AuthService.createToken(userId);
    }
}
