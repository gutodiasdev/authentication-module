import { SignInUser } from '../../../domain/features';

export class SignInUserUseCase implements SignInUser {
    async execute(input: SignInUser.Input): Promise<SignInUser.Output> {
        input
        return {
            id: '',
            token: '',
            refreshToken: '',
            permissions: ['']
        }
    }
}

describe('SignInUserUseCase', function () {
    let sut: SignInUserUseCase

    beforeEach(() => {
        sut = new SignInUserUseCase()
    })
    test('it should return user id, token, refresh token and permissions', async function () {
        const result = await sut.execute({ email: '', password: '' })
        expect(result.id).toBeDefined()
        expect(result.token).toBeDefined()
        expect(result.refreshToken).toBeDefined()
        expect(result.permissions).toBeDefined()
    })
})