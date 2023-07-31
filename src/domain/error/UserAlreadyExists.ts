export class UserAlreadyExistsError extends Error {
    constructor() {
        super('Usuário já cadastrado!')
        this.name = 'UserAlreadyExistsError'
    }
}