import { CreateUserRepository } from "../../data/contracts"
import { CreateUSer, CreateUser } from "../../domain/features"

export class CreateUserUseCase implements CreateUSer {
    constructor(private readonly userRepository: CreateUserRepository) { }

    async execute(input: CreateUser.Input): Promise<CreateUser.Ouput> {
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