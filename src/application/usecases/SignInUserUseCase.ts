import { FindUserByEmailRepository } from '../../data/contracts'
import { EmailOrPasswordAreWrong, TokenExpiredError } from '../../domain/error'
import { SignInUser, TokenIssuer } from '../../domain/features'

export class SignInUserUseCase implements SignInUser {
    constructor(
        private readonly userRepository: FindUserByEmailRepository,
        private readonly tokenIssuer: TokenIssuer
    ) {}

    async execute(input: SignInUser.Input): Promise<SignInUser.Output> {
        const tokenIsValid = await this.tokenIssuer.verify(input.token)
        if(!tokenIsValid) throw new TokenExpiredError()
        const user = await this.userRepository.findByEmail({ email: input.email })
        if(!user) throw new EmailOrPasswordAreWrong()
        const tokenIssuer = await this.tokenIssuer.generateToken({ id: user.id, permissions: user.permissions })
        return {
            id: user.id,
            token: tokenIssuer.token,
            permissions: user.permissions
        }
    }
}