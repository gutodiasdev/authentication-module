import { FindUserByEmailRepository } from '../../data/contracts'
import { EmailOrPasswordAreWrong, TokenExpiredError } from '../../domain/error'
import { SignInUser, TokenIssuer } from '../../domain/features'

export class SignInUserService implements SignInUser {
    constructor(
        private readonly userRepository: FindUserByEmailRepository,
        private readonly tokenIssuer: TokenIssuer
    ) {}

    async execute(input: SignInUser.Input): Promise<SignInUser.Output> {
        const tokenIsValid = this.tokenIssuer.verify({ token: input.token })
        if(!tokenIsValid) throw new TokenExpiredError()
        const user = await this.userRepository.findByEmail({ email: input.email })
        if(!user) throw new EmailOrPasswordAreWrong()
        const tokenIssuer = this.tokenIssuer.generateToken({ id: user.id, permissions: user.permissions })
        return {
            id: user.id,
            token: tokenIssuer.token,
            permissions: user.permissions
        }
    }
}