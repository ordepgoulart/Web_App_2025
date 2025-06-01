const formulario = document.getElementById("formCadCliente");
let urlBase = "http://localhost:4000/clientes";
let listaDeClientes = [];
let listaAux = [];
let sizesID;

function obterDadosClientes(){
    fetch(urlBase, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista)=>{
        listaDeClientes = lista;
        if(listaDeClientes.length == 0)
            sizesID = 0;
        else sizesID = listaDeClientes.length;
        mostrarTabelaClientes();
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}

function inserir(cliente){
    fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type": "aplication/json"
        },
        "body" : JSON.stringify(cliente)
    }).then((resposta) => {
        if(resposta.ok){
            obterDadosClientes();
        }
            
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR INSERIR AS INFORMAÇÕES DO SERVIDOR");
    });
}

formulario.onsubmit=manipularSubmissao;

function validar(cliente){
    listaAux = listaDeClientes.filter((obj) => obj.cpf == cliente.cpf);
    if(listaAux.length > 0)
        return false;
    return true;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const cpf = document.getElementById("cpf").value;
        const nome = document.getElementById("nome").value;
        const telefone = document.getElementById("telefone").value;
        const cidade = document.getElementById("cidade").value;
        const uf = document.getElementById("uf").value;
        const cep = document.getElementById("cep").value;
        const id = sizesID++;
        const cliente = {cpf,nome,telefone,cidade,uf,cep,id};
        if(validar(cliente)){
            inserir(cliente);
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

function mostrarTabelaClientes(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeClientes.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há clientes cadastrados</p>";
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Cidade</th>
                <th>UF</th>
                <th>CEP</th>
                <th>Ações</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeClientes.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeClientes[i].cpf;
            linha.innerHTML=`
                <td>${listaDeClientes[i].cpf}</td>
                <td>${listaDeClientes[i].nome}</td>
                <td>${listaDeClientes[i].telefone}</td>
                <td>${listaDeClientes[i].cidade}</td>
                <td>${listaDeClientes[i].uf}</td>
                <td>${listaDeClientes[i].cep}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirCliente('${listaDeClientes[i].nome}','${listaDeClientes[i].id}')"><i class="bi bi-trash">Excluir</i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirCliente(id,cpf){
    if(confirm("Deseja realmente excluir o cliente " + cpf + "?")){
        fetch(`${urlBase}/${id}`, {
            "method":"DELETE",
        })
        .then((resposta) =>{
            if(resposta.ok){
                obterDadosClientes();
                document.getElementById(cpf)?.remove(); //excluir a linha da tabela
            }
        })
        .catch((erro) => {
            alert("ERRO AO TENTAR EXCLUIR AS INFORMAÇÕES DO SERVIDOR");
        });
    }
}

obterDadosClientes();