export interface CreateRefreshTokenRepository {
    createRefreshToken(input: CreateRefreshTokenRepository.Input): Promise<CreateRefreshTokenRepository.Output>
}

export namespace CreateRefreshTokenRepository {
    export type Input = {
        userId: string,
        token: string
    }
    export type Output = {
        refreshToken: string
    }
}

export interface FindRefreshTokenRepository {
    findToken(input: FindRefreshTokenRepository.Input): Promise<FindRefreshTokenRepository.Output>
}

export namespace FindRefreshTokenRepository {
    export type Input = {
        token: string
    }
    export type Output = {
        token: string
        expirationDate: string
    }
}