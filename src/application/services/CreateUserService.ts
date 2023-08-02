import { randomUUID } from 'crypto'
import {
    CheckUserByEmailRepository,
    CreateRefreshTokenRepository,
    SaveUserRepository
} from '../../data/contracts'
import { CreateUserFailed, UserAlreadyExistsError } from '../../domain/error'
import { CreateUSer, CreateUser, TokenIssuer } from '../../domain/features'
import { User } from '../../domain/models'

export class CreateUserService implements CreateUSer {
    constructor(
        private readonly userRepository: SaveUserRepository & CheckUserByEmailRepository,
        private readonly refreshTokenRepository: CreateRefreshTokenRepository,
        private readonly tokenIssuerService: TokenIssuer
    ) { }

    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
        const userAlreadyExists = await this.userRepository.checkByEmail({ email: input.email })
        if (userAlreadyExists) throw new UserAlreadyExistsError()
        try {
            const user = User.create({
                email: input.email,
                password: input.password,
                agreeWithPolicies: input.agreeWithPolicies
            })
            await this.userRepository.saveUser({
                id: user.id,
                email: user.email,
                hashedPassword: user.password,
                agreeWithPolicies: user.agreeWithPolicies,
                permissions: input.permissions
            })
            const tokenIssuer = this.tokenIssuerService.generateToken({ id: user.id, permissions: user.permissions })
            const refreshToken = randomUUID()
            await this.refreshTokenRepository.createRefreshToken({ userId: user.id, token: refreshToken })

            return {
                token: tokenIssuer.token,
                refreshToken,
                permissions: user.permissions
            }
        } catch (error: any) {
            throw new CreateUserFailed(error.message)
        }
    }
}
