let listaDeProdutos  = [];
let listaDeCategorias = [];


function montarGrid(){
    const divitrine = document.getElementById("vitrine");
    
    for(let i = 0; i < listaDeProdutos.length; i++){
        const meucard = document.createElement('div');
        meucard.innerHTML=`
            <div class="card" style="width: 18rem; margin-bottom: 5rem;">
                <div class="card-body">
                    <h5 class="card-title">${listaDeProdutos[i].title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${listaDeProdutos[i].category}</h6>
                    <span class="card-text" style="display: flex; overflow-y: scroll;height:8rem">${listaDeProdutos[i].description}</span>
                    <span class="card-link">R$ ${listaDeProdutos[i].price}</span>
                    <a href="#" class="btn btn-outline-success" style="margin-left:  5rem">COMPRE</a>
                </div>
            </div>`;
        divitrine.appendChild(meucard);
    }
}

function obterProdutos(){
    fetch('https://fakestoreapi.com/products',{
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

obterDadosCat();

function carregarCat(){
    const listaCat = document.getElementById("cats");
    console.log(listaDeCategorias);
    if(listaDeCategorias.length > 0){
        let corpoLista = document.createElement('li');
        for(let i = 0; i < listaDeCategorias.length;i++){
            corpoLista.innerHTML = `<a class="dropdown-item" href="">${listaDeCategorias[i].nome}</a><li><hr class="dropdown-divider"></li>`;
            listaCat.appendChild(corpoLista);
        }
    }

}

obterProdutos();