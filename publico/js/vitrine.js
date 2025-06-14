let listaDeProdutos  = [];
let listaDeCategorias = [];
let listaAux = []

function montarGrid(){
    const divitrine = document.getElementById("vitrine");
    
    for(let i = 0; i < listaDeProdutos.length; i++){
        const meucard = document.createElement('div');
        meucard.innerHTML=`
            <div class="card" style="width: 18rem; margin-bottom: 5rem;">
                <div class="card-body">
                    <h5 class="card-title">${listaDeProdutos[i].nome}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${listaDeProdutos[i].categoria}</h6>
                    <span class="card-text" style="display: flex; overflow-y: scroll;height:8rem">${listaDeProdutos[i].desc}</span>
                    <span class="card-link">R$ ${listaDeProdutos[i].valor}</span>
                    <a href="#" class="btn btn-outline-success" style="margin-left:  5rem">COMPRE</a>
                </div>
            </div>`;
        divitrine.appendChild(meucard);
    }
}

function obterProdutos(){
    fetch('http://localhost:4000/produtos',{
        method:"GET"
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista) => {
        listaDeProdutos = lista;
        montarGrid();
    }).catch((erro) =>{
        alert("NÃO FOI POSSÍVEL CARREGAR OS PRODUTOS>: [" + erro + "]");
    })
}



function obterDadosCat(){
    fetch("http://localhost:4000/categorias", {
        method:"GET"
    }).then((resposta)=>{
        if(resposta.ok)
            return resposta.json();
    }).then((lista) =>{
        listaDeCategorias = lista;
        carregarCat();
        
    }).catch((erro)=>{
        console.log("[ERRO] - NÃO FOI POSSÍVEL CARREGAR AS INFORMAÇÕES DO SERVIDOR")
    })
 }



function montarGridPersonalizada(cat){
    const divitrine = document.getElementById("vitrine");
    divitrine.innerHTML=``;
    listaAux = listaDeProdutos.filter((produto) => produto.categoria == cat);
    for(let i = 0; i < listaAux.length; i++){
        const meucard = document.createElement('div');
        meucard.innerHTML=`
            <div class="card" style="width: 18rem; margin-bottom: 5rem;">
                <div class="card-body">
                    <h5 class="card-title">${listaAux[i].nome}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${listaAux[i].categoria}</h6>
                    <span class="card-text" style="display: flex; overflow-y: scroll;height:8rem">${listaAux[i].desc}</span>
                    <span class="card-link">R$ ${listaAux[i].valor}</span>
                    <a href="#" class="btn btn-outline-success" style="margin-left:  5rem">COMPRE</a>
                </div>
            </div>`;
        divitrine.appendChild(meucard);
    }
}

function carregarCat(){
    const listaCat = document.getElementById("cats");
    console.log(listaDeCategorias);
    if(listaDeCategorias.length > 0){
        for(let i = 0; i < listaDeCategorias.length;i++){
            const corpoLista = document.createElement('li');
            if(i == 0)
                corpoLista.innerHTML = `<button class="dropdown-item" onclick=" montarGridPersonalizada('${listaDeCategorias[i].nome}')">${listaDeCategorias[i].nome}</button>`;
            else corpoLista.innerHTML = `<li><hr class="dropdown-divider"></li><button class="dropdown-item" onclick=" montarGridPersonalizada('${listaDeCategorias[i].nome}')">${listaDeCategorias[i].nome}</button>`;
            listaCat.appendChild(corpoLista);
        }
    }

}

obterProdutos();
obterDadosCat();