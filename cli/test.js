const {
    deepEqual,
    ok
} = require('assert')

const database = require('./database')
const DEFAULT_ITEM_CADASTRAR = { 
    nome: 'Barba Francesa', 
    navio: 'Speed',
    id: 1
}

const DEFAULT_ITEM_ATUALIZAR = {
    nome: 'Barba Branca',
    navio: 'Farol',
    id: 1
}
describe('Suite de manipulação de piratas', () => {
    before(async () => {
        await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        await database.cadastrar(DEFAULT_ITEM_ATUALIZAR)
    })
    it('deve pesquisar um pirata usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const [resultado] = await database.listar(expected.id)
        deepEqual(resultado, expected)
    })
    it('deve cadastrar um pirata, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR
        const resultado = await database.cadastrar(DEFAULT_ITEM_CADASTRAR)
        const [actual] = await database.listar(DEFAULT_ITEM_CADASTRAR.id)
        
        deepEqual(actual, expected)
    })
    it('deve remover um pirata por id', async () => {
        const expected = true;
        const resultado = await database.remover(DEFAULT_ITEM_CADASTRAR.id)
        deepEqual(resultado, expected)
    })

    it.only('deve atualizar um pirata pelo id', async () => {
        const expected = {
            ...DEFAULT_ITEM_ATUALIZAR,
            nome: 'Exmarinheiro',
            porder: 'Dinheiro'            
        }
        const novoDado = {
            nome: 'Barba Amarela',
            porder: 'Dinheiro'                 
        }        
        await database.atualizar(DEFAULT_ITEM_ATUALIZAR.id, novoDado)
        const [resultado] = await database.listar(DEFAULT_ITEM_ATUALIZAR.id, expected)
        deepEqual(resultado, expected)
    })
})