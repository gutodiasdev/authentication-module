import { randomUUID } from 'crypto'
import { FindRefreshTokenRepository, UpdateRefreshTokenRepository } from '../../data/contracts'
import { InvalidRefreshTokenError, RefreshTokenIsExpiredError } from '../../domain/error'
import { DateHandler, TokenIssuer, TokenRefresher } from '../../domain/features'

export class TokenRefresherService implements TokenRefresher {
    constructor(
        private readonly tokenIssuerService: TokenIssuer,
        private readonly refreshTokenRepository: FindRefreshTokenRepository & UpdateRefreshTokenRepository,
        private readonly dateService: DateHandler
    ) { }

    async execute(input: TokenRefresher.Input): Promise<TokenRefresher.Output> {
        const refreshToken = await this.refreshTokenRepository.findToken({ token: input.refreshToken })
        if (!refreshToken) throw new InvalidRefreshTokenError()
        const isAfter = this.dateService.isAfter({ fromDate: refreshToken.expirationDate, toDate: this.dateService.getNow() })
        if (!isAfter) throw new RefreshTokenIsExpiredError()
        const newRefreshToken = randomUUID()
        const tokenIssuer = this.tokenIssuerService.generateToken({ id: input.id, permissions: input.persmissions })
        await this.refreshTokenRepository.updateRefreshToken({ token: newRefreshToken, expirationDate: this.dateService.getExpirationDate({ addDaysFromNow: 30 }) })
        return {
            token: tokenIssuer.token,
            refreshToken: newRefreshToken
        }
    }
}