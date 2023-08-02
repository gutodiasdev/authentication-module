import { MockProxy, mock } from 'jest-mock-extended'
import { TokenRefresherService } from '../../../application/services'
import { FindRefreshTokenRepository, UpdateRefreshTokenRepository } from '../../../data/contracts'
import { InvalidRefreshTokenError, RefreshTokenIsExpiredError } from '../../../domain/error'
import { DateHandler, TokenIssuer } from '../../../domain/features'

describe('TokenRefresherService', function () {
    let sut: TokenRefresherService
    let tokenIssuer: MockProxy<TokenIssuer>
    let dateService: MockProxy<DateHandler>
    let refreshTokenRepository: MockProxy<FindRefreshTokenRepository & UpdateRefreshTokenRepository>
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
        expect(result.token).toBeDefined()
        expect(result.refreshToken).toBeDefined()
    })

    test('it should throw InvalidRefreshTokenError when findToken method returns undefined', async function () {
        refreshTokenRepository.findToken.mockResolvedValueOnce(undefined)
        await expect(() => sut.execute(input)).rejects.toThrow(InvalidRefreshTokenError)
    })
    
    test('it should throw RefreshTokenIsExpiredError when isAfter method returns false', async function () {
        dateService.isAfter.mockReturnValue(false)
        await expect(() => sut.execute(input)).rejects.toThrow(RefreshTokenIsExpiredError)
    })
})
