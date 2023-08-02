export class RefreshTokenIsExpiredError extends Error {
    constructor() {
        super('RefreshToken expirou!')
        this.name = 'RefreshTokenIsExpiredError'
    }
}
