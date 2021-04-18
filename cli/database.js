const {
    readFile,
    writeFile    
} = require('fs')

const {
    promisify
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'piratas.json'
    }
    async obterDadosArquivo() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8')
        return JSON.parse(arquivo.toString())
    }
    async escreverArquivo(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados))
        return true    
    }    
    async cadastrar(pirata) {
        const dados = await this.obterDadosArquivo()
        const id = pirata.id <= 2 ? pirata.id : Date.now();

        const pirataidComId = {
            id,
            ...pirata
        }
        const dadosFinal = [
            ...dados,
            pirataidComId
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }

    async listar(id) {
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true))
        return dadosFiltrados
    }

    async remover(id) {
        if(!id) {
            await this.escreverArquivo([])
            return true;
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O usuario informado nao existe')

        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id))
        if (indice === -1) {
            throw Error('O pirata informado nao existe')
        }
        const atual = dados[indice]
        const objetoAtualizar = {
            ...atual,
            ...modificacoes
        }
        
        dados.splice(indice, 1)
        
        return await this.escreverArquivo([
            ...dados,
            objetoAtualizar
        ])
    }
}

module.exports = new Database()