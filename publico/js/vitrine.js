let listaDeProdutos  = [];
let listaDeCategorias = [];

/*function carregarProdutos(){
    fetch('https://fakestoreapi.com/products',{
        method:"GET"
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((listaDeProdutos) => {
        const divVitrine = document.getElementById("vitrine");
        for(const produto of listaDeProdutos){
            let card = document.createElement('div');
            card.innerHTML=`
            <div class="card" style="width: 18rem;">
                <img src="${produto.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${produto.title}</h5>
                    <p class="card-text">R$ ${produto.price}</p>
                    <a href="#" class="btn btn-primary">COMPRAR</a>
                </div>
            </div>`
            divVitrine.appendChild(card);
        }
    }).catch((erro) =>{
        alert("NÃO FOI POSSÍVEL CARREGAR OS PRODUTOS>: [" + erro + "]");
    })
    carregarProdutos();
}*/

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


