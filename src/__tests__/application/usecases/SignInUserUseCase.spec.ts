import { MockProxy, mock } from 'jest-mock-extended';
import { SignInUserUseCase } from '../../../application/usecases';
import { FindUserByEmailRepository } from '../../../data/contracts';
import { EmailOrPasswordAreWrong, TokenExpiredError } from '../../../domain/error';
import { TokenIssuer } from '../../../domain/features';

describe('SignInUserUseCase', function () {
    let tokenIssuer: MockProxy<TokenIssuer>
    let userRepository: MockProxy<FindUserByEmailRepository>
    let sut: SignInUserUseCase
    const input = { email: '', password: '', token: ''}

    beforeEach(() => {
        userRepository = mock()
        tokenIssuer = mock()
        sut = new SignInUserUseCase(userRepository, tokenIssuer)
        userRepository.findByEmail.mockResolvedValue({ id: '', password: '', permissions: [''] })
        tokenIssuer.verify.mockResolvedValue(true)
        tokenIssuer.generateToken.mockResolvedValue({ token: '' })
    })

    test('it should return user id, token, refresh token and permissions', async function () {
        const result = await sut.execute(input)
        expect(result.id).toBeDefined()
        expect(result.token).toBeDefined()
        expect(result.permissions).toBeDefined()
    })

    test('it should throw EmailOrPasswordAreWrong when findByEmail method return undefined', async function () {
        userRepository.findByEmail.mockResolvedValue(undefined)
        await expect(() => sut.execute(input)).rejects.toThrow(EmailOrPasswordAreWrong)
    })

    test('it should throw TokenExpiredError when verify method from TokenIssuer returns false', async function () {
        tokenIssuer.verify.mockResolvedValueOnce(false)
        await expect(() => sut.execute(input)).rejects.toThrow(TokenExpiredError)
    })
})