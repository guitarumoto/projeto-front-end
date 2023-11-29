document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formCadastro').addEventListener('submit', function(e) {
        e.preventDefault();
        adicionarItem();
    });
    atualizarLista();
});

function adicionarItem() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var idade = document.getElementById('idade').value;
    var mensagem = document.getElementById('mensagem').value;
    var genero = document.getElementById('genero').value;
    var data = new Date().toISOString().split('T')[0];

    var itens = JSON.parse(localStorage.getItem('itensForm') || '[]');
    itens.push({ data, nome, email, idade, mensagem, genero });
    localStorage.setItem('itensForm', JSON.stringify(itens));

    limparCampos();
    atualizarLista();
}

function limparCampos() {
    document.getElementById('formCadastro').reset();
}

function excluirItem(index) {
    var itens = JSON.parse(localStorage.getItem('itensForm') || '[]');
    itens.splice(index, 1);
    localStorage.setItem('itensForm', JSON.stringify(itens));
    atualizarLista();
}

function excluirTodos() {
    localStorage.removeItem('itensForm');
    atualizarLista();
}

function pesquisarItem() {
    var filtro = document.getElementById('pesquisa').value.toUpperCase();
    var itens = JSON.parse(localStorage.getItem('itensForm') || '[]');
    var filtrados = itens.filter(item => item.nome.toUpperCase().includes(filtro));
    montarLista(filtrados);
}

function atualizarLista() {
    var itens = JSON.parse(localStorage.getItem('itensForm') || '[]');
    montarLista(itens);
}

function montarLista(itens) {
    var html = itens.map((item, index) => 
        `<div>${item.data} - ${item.nome} - ${item.email} - ${item.idade} anos - ${item.mensagem} - ${item.genero}
            <button onclick="excluirItem(${index})">Excluir</button>
        </div>`).join('');
    html += itens.length > 0 ? '<button onclick="excluirTodos()">Excluir Todos</button>' : '';
    document.getElementById('lista').innerHTML = html;
}
