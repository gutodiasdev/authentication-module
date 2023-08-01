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