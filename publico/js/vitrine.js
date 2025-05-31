function carregarProdutos(){
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
}