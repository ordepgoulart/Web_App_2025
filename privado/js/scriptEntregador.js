const formulario = document.getElementById("formCadEntregador");
let urlBase = "http://localhost:4000/entregadores";
let listaDeEntregadores = [];
let listaAux = [];
let sizesID;

function obterDadosEntregadores(){
    fetch(urlBase, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json;
    }).then((lista) => {
        listaDeEntregadores = lista;
        if(listaDeEntregadores.length == 0)
            sizesID = 0;
        else sizesID =listaDeEntregadores.length;
        mostrarTabelaEntregadores();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    })
}

function inserir(entregador){
    fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type":"aplication/json"
        },
        "body": JSON.stringify(entregador)
    }).then((resposta) => {
        if(resposta.ok){
            obterDadosEntregadores();
        }
    }).catch((erro) => {
        alert("ERRO AO TENTAR INSERIR AS INFORMAÇÕES DO SERVIDOR");
    });
}


formulario.onsubmit=manipularSubmissao;

function validar(entregador){
    listaAux = listaDeEntregadores.filter((obj) => obj.bicp == fornecedor.bicp);
    if(listaAux.length > 0)
        return false;
    return true;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const bicp = document.getElementById("bicp").value;
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const cep = document.getElementById("cep").value;
        const cat = document.getElementById("cat").value
        const entregador = {bicp,nome,telefone,cidade,uf,cep,cat,id};
        const id = sizesID++;
        if(validar(entregador)){
            inserir(entregador);
            formulario.reset();
        }
        else alert("!!! DADOS REDUNDANTES FORAM ENCONTRADOS !!!")
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}

function mostrarTabelaEntregadores(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeEntregadores.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há entregadores cadastrados</p>";
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
            <tr>
                <th>CPF OU CNPJ</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Categoria</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeEntregadores.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeEntregadores[i].bicp;
            linha.innerHTML=`
                <td>${listaDeEntregadores[i].bicp}</td>
                <td>${listaDeEntregadores[i].nome}</td>
                <td>${listaDeEntregadores[i].telefone}</td>
                <td>${listaDeEntregadores[i].cidade}</td>
                <td>${listaDeEntregadores[i].uf}</td>
                <td>${listaDeEntregadores[i].cep}</td>
                <td>${listaDeEntregadores[i].cat}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirEntregador('${listaDeEntregadores[i].nome}','${listaDeEntregadores[i].bicp}')"><i class="bi bi-trash"></i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirEntregador(id, nome, bicp){
    if(confirm("Deseja realmente excluir o entregador " + nome + "?")){
        fetch(`${urlBase}/${id}`, {
            "method":"DELETE",
        }).then((resposta) => {
            if(resposta.ok){
                obterDadosEntregadores();
                document.getElementsId(bicp)?.remove();
            }
        }).catch((erro) => {
            alert("ERRO AO TENTAR EXCLUIR AS INFORMAÇÕES DO SERVIDOR");
        });
    }
}

mostrarTabelaEntregadores();