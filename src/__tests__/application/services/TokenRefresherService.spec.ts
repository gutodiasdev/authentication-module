import { MockProxy, mock } from 'jest-mock-extended'
import { TokenIssuer } from '../../../domain/features'

export class TokenRefresherService implements TokenRefresher {
    constructor(private readonly tokenIssuerService: TokenIssuer) {}
    
    async execute(input: TokenRefresher.Input): Promise<TokenRefresher.Output> {
        const tokenIssuer = this.tokenIssuerService.generateToken({ id: input.id, permissions: input.persmissions })
        return {
            token: tokenIssuer.token,
            refreshToken: ''
        }
    }
}

export interface TokenRefresher {
    execute(input: TokenRefresher.Input): Promise<TokenRefresher.Output>
}

export namespace TokenRefresher {
    export type Input = {
        refreshToken: string
        id: string
        persmissions: string[]
    }
    export type Output = {
        token: string
        refreshToken: string
    }
}

describe('TokenRefresherService', function () {
    let sut: TokenRefresherService
    let tokenIssuer: MockProxy<TokenIssuer>
    const input = { refreshToken: '', id: '', persmissions: [''] }

    beforeEach(() => {
        tokenIssuer = mock()
        sut = new TokenRefresherService(tokenIssuer)
        tokenIssuer.generateToken.mockReturnValue({ token: '' })
    })
    
    test('it should returns token and refreshToken when TokenRefresherService is executed', async function () {
        const  result = await sut.execute(input)
        expect(result).toEqual({ token: '', refreshToken: '' })
    })
})