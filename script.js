const transacoesUl = document.querySelector('#transacoes')
const somareceitasDisplay = document.querySelector('#money-plus')
const balancoDisplay = document.querySelector('#money-minus')
const balanceDisplay = document.querySelector('#balance')
const form = document.querySelector('#form')
const inputtransacaoName = document.querySelector('#text')
const inputtransacaoreceita = document.querySelector('#receita')


// BANCO DE DADOS
const localStoragetransacoes = JSON.parse(localStorage.getItem('transacoes'))
let transacoes = localStorage.getItem('transacoes') !== null ? localStoragetransacoes : []

//DELETANDO REGISTROS
const deletarregistros = ID => {
    transacoes = transacoes.filter(transacao =>
        transacao.id !== ID)
    AtualizacaoLocalStorage()    
    init()     
}


// INSERINDO DADOS NA TELA - 
const adddadosnatela = transacao => {
    const operador = transacao.receita < 0 ? '-' : '+'
    const CSCClass = transacao.receita < 0 ? 'minus' : 'plus'
    const receitaoperador = Math.abs(transacao.receita)
    const li = document.createElement('li')

    li.classList.add(CSCClass)  // jogando dados na tela
    li.innerHTML = `
        ${transacao.name} <span>${operador} R$ ${receitaoperador}</span><button class="delete-btn" onClick="deletarregistros(${transacao.id})">x</button>   
    `
    transacoesUl.append(li)
}

// FAZENDO OS CALCULOS

const balancadegastos = () => {
    const transacaoreceitas = transacoes.map(transacao => transacao.receita)
    const total = transacaoreceitas.reduce((accumulator, transacao) => accumulator + transacao, 0).toFixed(2) //calculando valor total da receita e despesas
    const somareceitas = transacaoreceitas.filter(value => value > 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2)
    const balanco = Math.abs (transacaoreceitas.filter(value => value < 0).reduce((accumulator, value) => accumulator + value, 0).toFixed(2))
    
    // EXIBINDO DADOS
    balanceDisplay.textContent = `R$ ${total}`
    somareceitasDisplay.textContent = `R$ ${somareceitas}`
    balancoDisplay.textContent = `R$ ${balanco}`
}

const init = () => {
    transacoesUl.innerHTML = ''
    transacoes.forEach(adddadosnatela)
    balancadegastos()
}

init ()
//SALVANDO NO LOCALSTORAGE
const AtualizacaoLocalStorage = () => {
    localStorage.setItem('transacoes', JSON.stringify(transacoes))
}
//GERANDO IDs
const gerandoID = () => Math.round(Math.random() * 1000) //gerando IDs
 

// ADICIONANDO OS DADOS
form.addEventListener('submit', event => {
    event.preventDefault()

    const transacaoName = inputtransacaoName.value.trim()
    const transacaoreceita = inputtransacaoreceita.value.trim()

    if(inputtransacaoName.value.trim() === '' || inputtransacaoreceita.value.trim() === '') {
        alert('Informe o valor e o nome da transação.')
        return
    }

    const transacao = {
        id: gerandoID(),
        name: transacaoName, 
        receita: Number(transacaoreceita)
    }

    transacoes.push(transacao)
    init ()
    AtualizacaoLocalStorage ()

    inputtransacaoreceita.value = ''
    inputtransacaoName.value = ''
})