const commander = require('commander')
const Commander = require('commander')
const Database = require('./database')
const Pirata = require('./Pirata')

async function main () {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do pirata")
        .option('-p, --poder [value]', "Poder do pirata")
        .option('-i, --id [value]', "ID do pirata")
        .option('-c, --cadastrar', "Cadastrar um pirata")
        .option('-l, --listar', "listar um pirata")
        .option('-r, --remover', "Remover um pirata pelo id")
        .option('-a, --atualizar [value]', "Atualizar um pirata")
        .parse(process.argv)
    const pirata = new Pirata(Commander)

    try {
        if(Commander.cadastrar) {            
            delete pirata.id

            const resultado = await Database.cadastrar(pirata)
            if(!resultado) {
                console.error('Pirata não foi cadastrado')
                return;
            }    
            console.log('Pirata Cadastrado com sucesso')
        }
        if (Commander.listar) {
            const resultado = await Database.listar()
            console.log(resultado)
            return;
        }
        if(commander.remover) {
            const resultado = await Database.remover(pirata.id)
            if(!resultado) {
                console.error('Não foi possivel resolver o pirata')
                return;
            }
            console.log('pirata removido com sucesso!')
        }

        if(Commander.atualizar) {
            const idParaAtualizar = parseInt(Commander.atualizar);
            delete pirata.id;
            // remover todas as chaves que estiverem com undefined
            const dado = JSON.stringify(pirata)
            const pirataAtualizar = JSON.parse(dado)
            const resultado = await Database.atualizar(idParaAtualizar, pirataAtualizar)
            if(!resultado) {
                console.error('Não foi possivel atualizar o pirata')
                return;
            }
            console.log('Pirata Atualizado com sucesso!')
        }

    } catch (error) {
        console.error('DEU RUIM', error)    
    }
}

main()