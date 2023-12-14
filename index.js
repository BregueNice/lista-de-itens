let nomeItem = document.getElementById('item');
let quantidadeItem = document.getElementById('quantidade');
let botaoAdicionar = document.getElementById('adicionar');
let botaoCancelar = document.getElementById('cancelar');

let botaoApagar = document.getElementById('apagar');
let botaoEditar = document.getElementById('editar');
let botaoAdd = document.getElementById('add');

let espaçoItens = document.getElementById('lista-itens');

let containerCadastro = document.getElementById('container-cadastrar');

let botoes = document.getElementById('botoes');
let botaoSalvar = document.getElementById('salvarEdicao');
let containerSalvar = document.getElementById('botao-edicao');

botaoAdd.addEventListener('click', () => {
    containerCadastro.classList.toggle('sumir');
    botaoSalvar.classList.add('sumir');
})

let itens = localStorage.getItem('itens')

if (itens) {
    itens = JSON.parse(itens);
} else {
    itens = [];
}

function listar() {
    espaçoItens.innerHTML = ""

    itens.forEach(item => {
        espaçoItens.innerHTML += `
        <li class="item-cadastrado">
        <div>
            ${item.nome}
        </div>
        <div>
            ${item.quantidade}
        </div>
        <div class="itens-botoes">
            <button id="apagar" onclick="excluir(this)" value="${item.nome}">Apagar</button>
            <button id="editar" onclick="editar(this)" value="${item.nome}">Editar</button>
        </div>
        </li>
    `
    });
}

listar();

botaoAdicionar.addEventListener('click', () => {

    const item = {
        nome: nomeItem.value,
        quantidade: quantidadeItem.value
    }

    if (nomeItem.value == "" || quantidadeItem.value == "") {
        window.alert('Verifique se todos os valores foram inseridos')
    } else {
        espaçoItens.innerHTML += `
        <li class="item-cadastrado">
        <div>
            ${item.nome}
        </div>
        <div>
            ${item.quantidade}
        </div>
        <div class="itens-botoes">
            <button id="apagar" onclick="excluir(this)" value="${item.nome}">Apagar</button>
            <button id="editar" onclick="editar(this)" value="${item.nome}">Editar</button>
        </div>
        </li>
    `

        itens.push(item)
        localStorage.setItem("itens", JSON.stringify(itens));
        nomeItem.value = ""
        quantidadeItem.value = ""
        containerCadastro.classList.add('sumir')
    }
})

function excluir(obj) {

    for (let a = 0; a < itens.length; a += 1) {
        if (itens[a].nome == obj.value) {
            itens.splice(a, 1);
            localStorage.setItem('itens', JSON.stringify(itens));
        }
    }
    listar();
}

function editar(obj) {

    containerCadastro.classList.remove('sumir');
    botaoSalvar.classList.remove('sumir');

    for (let a = 0; a < itens.length; a += 1) {
        if (itens[a].nome == obj.value) {
            botaoSalvar.addEventListener('click', () => {
                if (nomeItem.value !== "" && quantidadeItem.value !== "") {
                    itens[a].nome = nomeItem.value;
                    itens[a].quantidade = quantidadeItem.value;
                    localStorage.setItem('itens', JSON.stringify(itens));
                    listar();
                    containerCadastro.classList.add('sumir');
                }else{
                    window.alert('Verifique se todos os valores foram inseridos');
                }
            })
        }
    }
}

botaoCancelar.addEventListener('click', () => {
    nomeItem.value = ""
    quantidadeItem.value = ""
    containerCadastro.classList.add('sumir');
})