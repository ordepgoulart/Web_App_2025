const formulario = document.getElementById("formCadCategoria");
let listaDeCategorias = [];
let listaAux = [];
let sizesID;

function obterDadosCategoria(){
    fetch(urlBase, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista)=>{
        listaDeCategorias = lista;
        if(listaDeCategorias.length == 0)
            sizesID = 0;
        else sizesID = listaDeCategorias.length;
        mostrarTabelaCategorias();
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}

function inserir(categoria){
    fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type": "aplication/json"
        },
        "body" : JSON.stringify(categoria)
    }).then((resposta) => {
        if(resposta.ok){
            obterDadosCategorias();
        }
            
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR INSERIR AS INFORMAÇÕES DO SERVIDOR");
    });
}

formulario.onsubmit=manipularSubmissao;

function validar(categoria){
    listaAux = listaDeCategorias.filter((obj) => obj.id == categoria.id);
    if(listaAux.length > 0)
        return false;
    return true;
}

function manipularSubmissao(evento){
    if (formulario.checkValidity()){
        const id = document.getElementById("id").value;
        const nome = document.getElementById("nome").value;
        const descricao = document.getElementById("descricao").value;
        const auxid = sizesID++;
        const categoria = {id,nome,descricao,auxid};
        if(validar(categoria)){
            inserir(categoria);
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

function mostrarTabelaCategorias(){
    const divTabela = document.getElementById("tabela");
    divTabela.innerHTML=""; //apagando o conteúdo da div
    if (listaDeCategorias.length === 0){
        divTabela.innerHTML="<p class='alert alert-info text-center'>Não há categorias cadastradas</p>";
    }
    else{
        const tabela = document.createElement('table');
        tabela.className="table table-striped table-hover";

        const cabecalho = document.createElement('thead');
        const corpo = document.createElement('tbody');
        cabecalho.innerHTML=`
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
            </tr>
        `;
        tabela.appendChild(cabecalho);
        for (let i=0; i < listaDeCategorias.length; i++){
            const linha = document.createElement('tr');
            linha.id=listaDeCategorias[i].id;
            linha.innerHTML=`
                <td>${listaDeCategorias[i].id}</td>
                <td>${listaDeCategorias[i].nome}</td>
                <td>${listaDeCategorias[i].descricao}</td>
                <td><button type="button" class="btn btn-danger" onclick="excluirCliente('${listaDeCategorias[i].id}')"><i class="bi bi-trash">Excluir</i></button></td>
            `;
            corpo.appendChild(linha);
        }
        tabela.appendChild(corpo);
        divTabela.appendChild(tabela);

    }
}

function excluirCategoria(auxid,id){
    if(confirm("Deseja realmente excluir a categoria " + id + "?")){
        fetch(`${urlBase}/${auxid}`, {
            "method":"DELETE",
        })
        .then((resposta) =>{
            if(resposta.ok){
                obterDadosCategorias();
                document.getElementById(id)?.remove(); //excluir a linha da tabela
            }
        })
        .catch((erro) => {
            alert("ERRO AO TENTAR EXCLUIR AS INFORMAÇÕES DO SERVIDOR");
        });
    }
}

obterDadosCategorias();