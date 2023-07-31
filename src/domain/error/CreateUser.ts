
export class CreateUserFailed extends Error {
    constructor(error?: string) {
        super( error ?? 'Criação de usuário falhou')
        this.name = 'CreateUserFailed'
    }
}