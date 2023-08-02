export interface TokenIssuer {
    generateToken(input: TokenIssuerGenerator.Input): TokenIssuerGenerator.Ouput
    verify(token: TokenIssuerVerifier.Input): TokenIssuerVerifier.Ouput
}

export namespace TokenIssuerGenerator {
    export type Input = {
        id: string
        permissions: string[]
    }

    export type Ouput = {
        token: string
    }
}

export namespace TokenIssuerVerifier {
    export type Input = {
        token: string
    }

    export type Ouput = {
        exp: string
        iat: string
        id: string
        permissions: string[]
    }
}

