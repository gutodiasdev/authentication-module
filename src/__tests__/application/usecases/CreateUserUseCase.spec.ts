import { MockProxy, mock } from 'jest-mock-extended'
import { CreateUserUseCase } from '../../../application/usecases'
import { CheckUserByEmailRepository, CreateUserRepository } from '../../../data/contracts'
import { CreateUserFailed, UserAlreadyExistsError } from '../../../domain/error'

describe('CreateUserUseCase', function () {
    let userRepository: MockProxy<CreateUserRepository & CheckUserByEmailRepository>
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
        userRepository.checkByEmail.mockResolvedValue(undefined)
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

    test('it should throw UserAlreadyExistsError if checkByEmail method return value', async function () {
        userRepository.checkByEmail.mockResolvedValueOnce({ id: '' })
        await expect(() => sut.execute(input)).rejects.toThrow(UserAlreadyExistsError)
    })

    test('it should throw CreateUserFailed if createUser method fails', async function () {
        userRepository.createUser.mockRejectedValueOnce({})
        await expect(() => sut.execute(input)).rejects.toThrow(CreateUserFailed)
    })
})