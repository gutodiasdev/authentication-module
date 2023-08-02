import { FindRefreshTokenRepository } from '../../data/contracts'
import { InvalidRefreshTokenError, RefreshTokenIsExpiredError } from '../../domain/error'
import { DateHandler, TokenIssuer, TokenRefresher } from '../../domain/features'

export class TokenRefresherService implements TokenRefresher {
    constructor(
        private readonly tokenIssuerService: TokenIssuer,
        private readonly refreshTokenRepository: FindRefreshTokenRepository,
        private readonly dateService: DateHandler
    ) {}
    
    async execute(input: TokenRefresher.Input): Promise<TokenRefresher.Output> {
        const refreshToken = await this.refreshTokenRepository.findToken({ token: input.refreshToken })
        if(!refreshToken) throw new InvalidRefreshTokenError()
        const isAfter = this.dateService.isAfter({ fromDate: refreshToken.expirationDate, toDate: this.dateService.getNow()})
        if (!isAfter) throw new RefreshTokenIsExpiredError()
        const tokenIssuer = this.tokenIssuerService.generateToken({ id: input.id, permissions: input.persmissions })
        return {
            token: tokenIssuer.token,
            refreshToken: ''
        }
    }
}