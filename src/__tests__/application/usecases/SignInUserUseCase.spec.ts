import { MockProxy, mock } from 'jest-mock-extended';
import { FindUserByEmailRepository } from '../../../data/contracts';
import { EmailOrPasswordAreWrong } from '../../../domain/error';
import { SignInUser } from '../../../domain/features';

export class SignInUserUseCase implements SignInUser {
    constructor(private readonly userRepository: FindUserByEmailRepository) {}

    async execute(input: SignInUser.Input): Promise<SignInUser.Output> {
        const user = await this.userRepository.findByEmail({ email: input.email })
        if(!user) throw new EmailOrPasswordAreWrong()
        return {
            id: user.id,
            token: '',
            refreshToken: '',
            permissions: ['']
        }
    }
}

describe('SignInUserUseCase', function () {
    let userRepository: MockProxy<FindUserByEmailRepository>
    let sut: SignInUserUseCase

    beforeEach(() => {
        userRepository = mock()
        sut = new SignInUserUseCase(userRepository)
        userRepository.findByEmail.mockResolvedValue({ id: '', password: '', permissions: [''] })
    })

    test('it should return user id, token, refresh token and permissions', async function () {
        const result = await sut.execute({ email: '', password: '' })
        expect(result.id).toBeDefined()
        expect(result.token).toBeDefined()
        expect(result.refreshToken).toBeDefined()
        expect(result.permissions).toBeDefined()
    })

    test('it should throw EmailOrPasswordAreWrong when findByEmail method return undefined', async function () {
        userRepository.findByEmail.mockResolvedValue(undefined)
        await expect(() => sut.execute({ email: '', password: '' })).rejects.toThrow(EmailOrPasswordAreWrong)
    })
})