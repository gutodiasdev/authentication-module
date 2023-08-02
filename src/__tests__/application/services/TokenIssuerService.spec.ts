import { TokenIssuerService } from '../../../application/services'

describe('TokenIssuerService', function () {
    let sut: TokenIssuerService
    let token: string

    beforeEach(() => {
        sut = new TokenIssuerService()
    })
    
    test('it should return token when generateToken is called', async function () {
        const tokenIssuer = await sut.generateToken({ id: '', permissions: [''] })
        token = tokenIssuer.token
        expect(tokenIssuer.token).toBeDefined()
    })

    test('it should return verification object when a token is passed', async function () {
        const tokenIssuer = sut.verify({ token: token })
        expect(tokenIssuer.exp).toBeDefined()
        expect(tokenIssuer.iat).toBeDefined()
        expect(tokenIssuer.id).toBeDefined()
        expect(tokenIssuer.permissions).toBeDefined()
    })
})