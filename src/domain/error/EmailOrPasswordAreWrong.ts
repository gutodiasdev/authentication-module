export class EmailOrPasswordAreWrong extends Error {
    constructor() {
        super('Email ou senha estão incorretos. Tente novamente.')
        this.name = 'EmailOrPasswordAreWrong'
    }
}