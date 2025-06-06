const formulario = document.getElementById("formCadFornecedor");
let urlBase = "http://localhost:4000/fornecedores";
let listaDeFornecedores = [];
let listaAux = [];
let sizesID;

function obterDadosFornecedores(){
    fetch(urlBase, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeFornecedores = lista;
        if(listaDeFornecedores.length == 0)
            sizesID = 0;
        else sizesID = listaDeFornecedores.length;
        mostrarTabelaFornecedores();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    })    
}

function inserir(fornecedor){
    fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type":"aplication/json"
        },
        "body":JSON.stringify(fornecedor)
    }).then((resposta) => {
        if(resposta.ok){
            obterDadosFornecedores();
        }
    }).catch((erro) => {
        alert("ERRO AO TENTAR INSERIR AS INFORMAÇÕES DO SERVIDOR");
    });
}

formulario.onsubmit=manipularSubmissao;

function validar(fornecedor){
    listaAux = listaDeFornecedores.filter((obj) => obj.cnpj == fornecedor.cnpj);
    if(listaAux.length > 0)
        return false;
    return true;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const id = sizesID;
        const cnpj = document.getElementById("cnpj").value;
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const cep = document.getElementById("cep").value;
        const cat = document.getElementById("cat").value;
        const fornecedor = {cnpj,nome,telefone,cidade,uf,cep,cat,id};
        if(validar(fornecedor)){
            inserir(fornecedor);
            mostrarTabelaFornecedores();
        }
        else alert("!!! DADOS REDUNDANTES FORAM ENCONTRADOS !!!");
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}

function mostrarTabelaFornecedores(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeFornecedores.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há Fornecedores cadastrados</p>";
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
            <tr>
                <th>CNPJ</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Categoria</th>
                <th>Ações</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeFornecedores.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeFornecedores[i].cnpj;
            linha.innerHTML=`
                <td>${listaDeFornecedores[i].cnpj}</td>
                <td>${listaDeFornecedores[i].nome}</td>
                <td>${listaDeFornecedores[i].telefone}</td>
                <td>${listaDeFornecedores[i].cidade}</td>
                <td>${listaDeFornecedores[i].uf}</td>
                <td>${listaDeFornecedores[i].cep}</td>
                <td>${listaDeFornecedores[i].cat}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirFornecedores('${listaDeFornecedores[i].id}','${listaDeFornecedores[i].nome}','${listaDeFornecedores[i].cnpj}')"><i class="bi bi-trash">Excluir</i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirFornecedores(id, nome, cnpj){
    if(confirm("Deseja realmente excluir o fornecedor " + nome + "?")){
        fetch(`${urlBase}/${id}`,{
            "method":"DELETE",
        })
        .then((resposta) =>{
            if(resposta.ok){
                obterDadosFornecedores();
                document.getElementById(cnpj)?.remove();
            }
        }).catch((erro) => {
            alert("ERRO AO TENTAR EXCLUIR AS INFORMAÇÕES DO SERVIDOR");
        });
    }
}

obterDadosFornecedores();