import { JwtPayload, sign, verify } from 'jsonwebtoken'
import { TokenIssuer, TokenIssuerGenerator, TokenIssuerVerifier } from '../../domain/features'

export class TokenIssuerService implements TokenIssuer {
    EXPIRES_IN = '5m'

    async generateToken(input: TokenIssuerGenerator.Input): Promise<TokenIssuerGenerator.Ouput> {
        const token = sign({ id: input.id, permissions: input.permissions }, 'TOKEN_SECRET', { expiresIn: this.EXPIRES_IN })

        return {
            token: token
        }
    }

    verify(input: TokenIssuerVerifier.Input): TokenIssuerVerifier.Ouput {
        const token = verify(input.token, 'TOKEN_SECRET') as JwtPayload & { exp: string, iat: string, id: string, permissions: string[] }
        return {
            exp: token.exp,
            iat: token.iat,
            id: token.id,
            permissions: token.permissions
        }
    }
    
}
