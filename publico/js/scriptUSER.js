const formulario = document.getElementById("formUSERS");
let urlBase = "http://localhost:4000/users";
let listaDeUsuarios = [];
let listaAux = [];
let sizesID;

 // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation');

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  });

function obterDados(){
    fetch(urlBase, {
        method:"GET",
    }).then((resposta) => {
        if(resposta.ok)
            return resposta.json();
    }).then((lista)=>{
        listaDeUsuarios = lista;
        if(listaDeUsuarios.length == 0)
                sizesID = 0;
        else sizesID = listaDeUsuarios.length;
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR RECUPERAR AS INFORMAÇÕES DO SERVIDOR");
    });
}

function inserir(user){
    fetch(urlBase, {
        "method":"POST",
        "headers": {
            "Content-Type": "aplication/json"
        },
        "body" : JSON.stringify(user)
    }).then((resposta) => {
        if(resposta.ok){
            obterDados();
        }    
    })
    .catch((erro) => {
        alert("ERRO AO TENTAR INSERIR AS INFORMAÇÕES DO SERVIDOR");
    });
}


function validar(user){
    listaAux = listaDeUsuarios.filter((obj) => obj.cpf == user.cpf || obj.email == user.email);
    if(listaAux.length > 0)
        return false;
    return true;
}

function manipularSubmissaoUSER(evento){
    if (formulario.checkValidity()){
        const cpf = document.getElementById("cpf").value;
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("private").value;
        const data = document.getElementById("data").value;
        const id = sizesID++;
        const user = {cpf,nome,email,senha,data,id};
        if(validar(user) && email != "admin@dot.com"){
            inserir(user);
            formulario.reset();
            alert("Usuário registrado com sucesso")
            window.location.href = "login.html";
        }
        else{
            alert("!!! O EMAIL OU CPF JÁ ESTÃO SENDO UTILIZADOS !!!");  
        } 
    }
    else{
        formulario.classList.add('was-validated');
    }
    evento.preventDefault(); //cancelamento do evento
    evento.stopPropagation(); //impedindo que outros observem esse evento

}
formulario.onsubmit=manipularSubmissaoUSER;

obterDados();