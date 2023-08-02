import { MockProxy, mock } from 'jest-mock-extended'
import { FindRefreshTokenRepository } from '../../../data/contracts'
import { InvalidRefreshTokenError } from '../../../domain/error'
import { DateHandler, TokenIssuer, TokenRefresher } from '../../../domain/features'

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

export class RefreshTokenIsExpiredError extends Error {
    constructor() {
        super('RefreshToken expirou!')
        this.name = 'RefreshTokenIsExpiredError'
    }
}

describe('TokenRefresherService', function () {
    let sut: TokenRefresherService
    let tokenIssuer: MockProxy<TokenIssuer>
    let dateService: MockProxy<DateHandler>
    let refreshTokenRepository: MockProxy<FindRefreshTokenRepository>
    const input = { refreshToken: '', id: '', persmissions: [''] }

    beforeEach(() => {
        tokenIssuer = mock()
        refreshTokenRepository = mock()
        dateService = mock()
        sut = new TokenRefresherService(tokenIssuer, refreshTokenRepository, dateService)
        tokenIssuer.generateToken.mockReturnValue({ token: '' })
        dateService.isAfter.mockReturnValue(true)
        refreshTokenRepository.findToken.mockResolvedValue({ token: '', expirationDate: '' })
    })
   
    test('it should returns token and refreshToken when TokenRefresherService is executed', async function () {
        const  result = await sut.execute(input)
        expect(result).toEqual({ token: '', refreshToken: '' })
    })

    test('it should throw InvalidRefreshTokenError when findToken method returns undefined', async function () {
        refreshTokenRepository.findToken.mockResolvedValueOnce(undefined)
        await expect(() => sut.execute(input)).rejects.toThrow(InvalidRefreshTokenError)
    })
    
    test('it should throw InvalidRefreshTokenError when findToken method returns undefined', async function () {
        dateService.isAfter.mockReturnValue(false)
        await expect(() => sut.execute(input)).rejects.toThrow(RefreshTokenIsExpiredError)
    })
})
