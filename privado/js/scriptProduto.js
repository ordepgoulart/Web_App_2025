const formulario = document.getElementById("formCadProduto");
const listaDeOp = document.getElementById("fornecedorLista");
const listaCat = document.getElementById("cat");
let urlBase1 = "http://localhost:4000/produtos";
let urlBase2 = "http://localhost:4000/fornecedores";
let urlBase3 = "http://localhost:4000/categorias";
let listaDeProdutos = [];
let listaDeFornecedores = [];
let listaDeCategorias = [];
let listaAux = [];

function obterDadosProdutos(){
    fetch(urlBase1, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeProduto = lista;
        if(listaDeProdutos.length == 0)
            sizesID = 0;
        else sizesID = listaDeProdutos.length;
        mostrarTabelaProdutos();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}
function obterDadosFornecedores(){
    fetch(urlBase2, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((listaF) => {
        listaDeFornecedores = listaF;
        criarListaOp();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}

function obterDadosCategorias(){
    fetch(urlBase3, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((listaC)=>{
        listaDeCategorias = listaC;
        criarListaCat();
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}



function criarListaOp(){
    if(listaDeFornecedores.length > 0){
        for(let i = 0; i < listaDeFornecedores.length; i++){
            const op = document.createElement("option");
            op.value = listaDeFornecedores[i].nome;
            op.innerHTML = listaDeFornecedores[i].nome;
            listaDeOp.appendChild(op);
        }
    }
}

function criarListaCat(){
    if(listaDeCategorias.length > 0){
        for(let i = 0; i < listaDeCategorias.length; i++){
            const op = document.createElement("option");
            op.value = listaDeCategorias[i].nome;
            op.innerHTML = listaDeCategorias[i].nome;
            listaCat.appendChild(op);
        }
    }
}

formulario.onsubmit=manipularSubmissao;

function validarProduto(produto){
    listaAux = listaDeProdutos.filter((obj) => obj.barras == produto.barras);
    if(listaAux.length > 0)
        return true;
    return false;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const idProd = sizesID;
        const nome = document.getElementById("nome").value;
        const fornecedor = document.getElementById("fornecedorLista").value;
        const categoria = document.getElementById("cat").value;
        const barras = document.getElementById("bar").value;
        const estoque = document.getElementById("qtde").value;
        const valor = document.getElementById("valor").value;
        const data = document.getElementById("datEx").value;
        const produto = {idProd,fornecedor,nome,categoria,barras,estoque,valor,data};
        if(validarProduto(produto)){
            inserir(produto);
            mostrarTabelaProdutos();
        }
        else alert("!!! DADOS REDUNDANTES FORAM ENCONTRADOS !!!")
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}

function mostrarTabelaProdutos(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeProdutos.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há produtos cadastrados</p>";
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
            <tr>
                <th>NOME</th>
                <th>FORNECEDOR</th>
                <th>CATEGORIA</th>
                <th>QTDE</th>
                <th>VALOR</th>
                <th>CÓDIGO DE BARRAS</th>
                <th>DATA DE RECEBIMENTO</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeProdutos.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeProdutos[i].barras;
            linha.innerHTML=`
                <td>${listaDeProdutos[i].nome}</td>
                <td>${listaDeProdutos[i].fornecedor}</td>
                <td>${listaDeProdutos[i].categoria}</td>
                <td>${listaDeProdutos[i].estoque}</td>
                <td>${listaDeProdutos[i].valor}</td>
                <td>${listaDeProdutos[i].barras}</td>
                <td>${listaDeProdutos[i].data}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirProduto('${listaDeProdutos[i].nome}','${listaDeProdutos[i].barras}','${listaDeProdutos[i].idProd}')"><i class="bi bi-trash"></i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirProduto(nome,barras, id){
    if(confirm("Deseja realmente excluir o produto " + nome + "?")){
        fetch(`${urlBase}/${id}`, {
            method:"DELETE",
        }).then((resposta) => {
            if(resposta.ok){
                obterDadosProdutos();
                document.getElementById(barras)?.remove(); //excluir a linha da tabela
            }
        }).catch((erro) =>{
            alert("ERRO AO TENTAR EXCLUIR AS INFORMAÇÕES DO SERVIDOR");
        });    
    }
}

obterDadosProdutos();
obterDadosCategorias();
obterDadosFornecedores();