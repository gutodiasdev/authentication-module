import { MockProxy, mock } from 'jest-mock-extended'
import { CreateUserService } from '../../../application/usecases'
import { CheckUserByEmailRepository, CreateRefreshTokenRepository, SaveUserRepository } from '../../../data/contracts'
import { CreateUserFailed, UserAlreadyExistsError } from '../../../domain/error'

describe('CreateUserService', function () {
    let userRepository: MockProxy<SaveUserRepository & CheckUserByEmailRepository>
    let refreshTokenRepository: MockProxy<CreateRefreshTokenRepository>
    let sut: CreateUserService
    const input = {
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true,
        permissions: ['any.permission']
    }

    beforeEach(() => {
        userRepository = mock()
        refreshTokenRepository = mock()
        sut = new CreateUserService(userRepository, refreshTokenRepository)
        userRepository.checkByEmail.mockResolvedValue(undefined)
    })

    test('it should return token, refreshToken and permissions when CreateUserService is called', async function () {
        const result = await sut.execute(input)
        expect(result.token).toBeDefined()
        expect(result.refreshToken).toBeDefined()
        expect(result.permissions).toBeDefined()
    })
    
    test('it should throw UserAlreadyExistsError if checkByEmail method return value', async function () {
        userRepository.checkByEmail.mockResolvedValueOnce({ id: '' })
        await expect(() => sut.execute(input)).rejects.toThrow(UserAlreadyExistsError)
    })

    test('it should throw CreateUserFailed if createUser method fails', async function () {
        userRepository.saveUser.mockRejectedValueOnce({})
        await expect(() => sut.execute(input)).rejects.toThrow(CreateUserFailed)
    })
})