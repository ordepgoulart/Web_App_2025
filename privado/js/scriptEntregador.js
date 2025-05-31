const formulario = document.getElementById("formCadEntregador");
let listaDeEntregador = [];
let listaAux = [];

if (localStorage.getItem("entregador")){
    //recuperando do armazenamento local a lista de EntlistaDeEntregador
    listaDeEntregador = JSON.parse(localStorage.getItem("entregador"));
}

formulario.onsubmit=manipularSubmissao;

function validar(entregador){
    listaAux = listaDeEntregador.filter((obj) => obj.bicp == fornecedor.bicp);
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
        const categoria = document.getElementById("cat").value
        const entregador = {bicp,nome,telefone,cidade,uf,cep};
        if(validar(entregador)){
            listaDeEntregador.push(entregador);
            localStorage.setItem("entregador", JSON.stringify(listaDeEntregador));
            formulario.reset();
            mostrarTabelaEntregadores();
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
    if (listaDeEntregador.length === 0){
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
        for (let i=0; i < listaDeEntregador.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeEntregador[i].bicp;
            linha.innerHTML=`
                <td>${listaDeEntregador[i].bicp}</td>
                <td>${listaDeEntregador[i].nome}</td>
                <td>${listaDeEntregador[i].telefone}</td>
                <td>${listaDeEntregador[i].cidade}</td>
                <td>${listaDeEntregador[i].uf}</td>
                <td>${listaDeEntregador[i].cep}</td>
                <td>${listaDeEntregador[i].cat}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirCliente('${listaDeEntregador[i].bicp}')"><i class="bi bi-trash"></i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirEntregador(bicp){
    if(confirm("Deseja realmente excluir o entregador " + bicp + "?")){
        listaDeEntregador = listaDeEntregador.filter((entregador) => { 
            return entregador.bicp !== bicp;
        });
        localStorage.setItem("EntlistaDeEntregador", JSON.stringify(listaDeEntregador));
        document.getElementById(bicp).remove(); //excluir a linha da tabela
    }
}

mostrarTabelaEntregadores();