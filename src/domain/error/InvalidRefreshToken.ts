export class InvalidRefreshTokenError extends Error {
    constructor() {
        super('Refresh token é invalido!')
        this.name = 'InvalidRefreshTokenError'
    }
}