import { MockProxy, mock } from 'jest-mock-extended'
import { CreateUserRepository } from '../../data/contracts'
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

describe('CreateUserUseCase', function () {
    let userRepository: MockProxy<CreateUserRepository>
    let sut: CreateUserUseCase
    const input = {
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true,
        permissions: ['any.permission']
    }

    beforeEach(() => {
        userRepository = mock()
        sut = new CreateUserUseCase(userRepository)
    })

    test('it should return token, refreshToken and permissions when CreateUserUseCase is called', async function () {
        const result = await sut.execute(input)
        expect(result.token).toBeDefined()
        expect(result.refreshToken).toBeDefined()
        expect(result.permissions).toBeDefined()
    })

    test('it should call createUser method with correct params', async function () {
        userRepository.createUser.mockResolvedValue({ id: '' })
        await sut.execute(input)
        expect(userRepository.createUser).toHaveBeenCalledWith({
            email: 'any_email',
            hashedPassword: 'any_password',
            agreeWithPolicies: true,
            permissions: ['any.permission']
        })
    })
})