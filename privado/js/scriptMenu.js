const formularioCli = document.getElementById("formCadCliente");
const formularioPro = document.getElementById("formCadProduto");
const formularioFor = document.getElementById("formCadFornecedor");
const formularioEnt = document.getElementById("formCadEntregador");
const formularioUse = document.getElementById("formUSERS");
let urlBaseCli = "http://localhost:4000/clientes";
let urlBasePro = "http://localhost:4000/produtos";
let urlBaseFor = "http://localhost:4000/fornecedores";
let urlBaseEnt = "http://localhost:4000/entregadores";
let urlBaseUse = "http://localhost:4000/users";
let listaDeClientes = [];
let listaDeProdutos = [];
let listaDeFornecedores = [];
let listaDeEntregadores = [];
let listaDeUsuarios = [];
let listaAux = [];

function obterDadosClientes(){
    fetch(urlBaseCli, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista)=>{
        listaDeClientes = lista;
        mostrarTabelaClientes();
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}
function obterDadosProdutos(){
    fetch(urlBasePro, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeProdutos = lista;
        mostrarTabelaProdutos();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}
function obterDadosFornecedores(){
    fetch(urlBaseFor, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeFornecedores = lista;
        mostrarTabelaFornecedores();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    })    
}
function obterDadosEntregadores(){
    fetch(urlBaseEnt, {
        method:"GET",
    }).then((resposta) => {
        console.log(resposta);
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeEntregadores = lista;
        mostrarTabelaEntregadores();
    }).catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}
function obterDadosUsuarios(){
    fetch(urlBaseUse, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista)=>{
        listaDeUsuarios = lista;
        mostrarTabelaUsuarios();
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}
function mostrarTabelaClientes(){
    const divTabela = document.getElementById("tabelaClientes");
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
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}
function mostrarTabelaProdutos(){
    const divTabela = document.getElementById("tabelaProdutos");
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
            linha.id=listaDeProdutos[i].id;
            linha.innerHTML=`
                <td>${listaDeProdutos[i].nome}</td>
                <td>${listaDeProdutos[i].fornecedor}</td>
                <td>${listaDeProdutos[i].categoria}</td>
                <td>${listaDeProdutos[i].estoque}</td>
                <td>${listaDeProdutos[i].valor}</td>
                <td>${listaDeProdutos[i].id}</td>
                <td>${listaDeProdutos[i].data}</td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}
function mostrarTabelaFornecedores(){
    const divTabela = document.getElementById("tabelaFornecedores");
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
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}
function mostrarTabelaEntregadores(){
    const divTabela = document.getElementById("tabelaEntregadores");
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
                `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}
function mostrarTabelaUsuarios(){
    const divTabela = document.getElementById("tabelaUsuarios");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeUsuarios.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há Usuarios cadastrados</p>";
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
                <th>Email</th>
                <th>Data</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeUsuarios.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeUsuarios[i].cpf;
            linha.innerHTML=`
                <td>${listaDeUsuarios[i].cpf}</td>
                <td>${listaDeUsuarios[i].nome}</td>
                <td>${listaDeUsuarios[i].email}</td>
                <td>${listaDeUsuarios[i].data}</td>
                `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

obterDadosClientes();
obterDadosProdutos();
obterDadosFornecedores();
obterDadosEntregadores();
obterDadosUsuarios();