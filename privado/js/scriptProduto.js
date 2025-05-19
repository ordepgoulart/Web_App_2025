const formulario = document.getElementById("formCadProduto");
let listaDeProdutos = [];
let listaDeFornecedores = [];
let listaAux = [];

if (localStorage.getItem("fornecedores")){
    //recuperando do armazenamento local a lista de clientes
    listaDeFornecedores = JSON.parse(localStorage.getItem("fornecedores"));
}
if (localStorage.getItem("produtos")){
    //recuperando do armazenamento local a lista de clientes
    listaDeClientes = JSON.parse(localStorage.getItem("produtos"));
}

formulario.onsubmit=manipularSubmissao;

function validarFornecedor(cnpj){
    listaAux = listaDeFornecedores.filter((obj) => obj.cnpj == cnpj);
    if(listaAux.length > 0)
        return true;
    return false;
}

function validarProduto(produto){
    listaAux = listaDeProdutos.filter((obj) => obj.nome != produto.nome && obj.barras == produto.barras);
    if(listaAux.length > 0)
        return true;
    return false;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const cnpj = document.getElementById("cnpj").value;
        const nome = document.getElementById("nome").value;
        const categoria = document.getElementById("cat").value;
        const barras = document.getElementById("bar").value;
        const estoque = document.getElementById("qtde").value;
        const valor = document.getElementById("valor").value;
        const data = document.getElementById("datEx").value;
        const produto = {cnpj,nome,categoria,barras,estoque,valor,data};
        if(validarFornecedor(cnpj) && validarProduto(produto)){
            listaDeProdutos.push(produto);
            localStorage.setItem("produtos", JSON.stringify(listaDeProdutos));
            formulario.reset();
            mostrarTabelaClientes();
        }
        else alert("!!! DADOS REDUNDANTES FORAM ENCONTRADOS !!!")
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}

function mostrarTabelaClientes(){
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
                <th>CNPJ</th>
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
                <td>${listaDeProdutos[i].cnpj}</td>
                <td>${listaDeProdutos[i].categoria}</td>
                <td>${listaDeProdutos[i].estoque}</td>
                <td>${listaDeProdutos[i].valor}</td>
                <td>${listaDeProdutos[i].barras}</td>
                <td>${listaDeProdutos[i].data}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirProduto('${listaDeProdutos[i].barras}')"><i class="bi bi-trash"></i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirProduto(barras){
    if(confirm("Deseja realmente excluir o produto " + barras + "?")){
        listaDeProdutos = listaDeProdutos.filter((produto) => { 
            return produto.barras !== barras;
        });
        localStorage.setItem("produtos", JSON.stringify(listaDeProdutos));
        document.getElementById(cpf).remove(); //excluir a linha da tabela
    }
}

mostrarTabelaClientes();