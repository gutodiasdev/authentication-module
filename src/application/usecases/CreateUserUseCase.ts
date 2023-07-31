import { CheckUserByEmailRepository, CreateUserRepository } from "../../data/contracts"
import { UserAlreadyExistsError } from "../../domain/error"
import { CreateUSer, CreateUser } from "../../domain/features"

export class CreateUserUseCase implements CreateUSer {
    constructor(private readonly userRepository: CreateUserRepository & CheckUserByEmailRepository) { }

    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
        const userAlreadyExists = await this.userRepository.checkByEmail({ email: input.email })
        if(userAlreadyExists) throw new UserAlreadyExistsError()
        await this.userRepository.createUser({
            email: input.email,
            hashedPassword: input.password,
            agreeWithPolicies: input.agreeWithPolicies,
            permissions: input.permissions
        })
        return {
            token: '',
            refreshToken: '',
            permissions: ['']
        }
    }
}
