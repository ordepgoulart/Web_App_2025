import express from 'express';
import session from 'express-session';
import verificarAutenticacao from './seguranca/autenticar.js';

// const express = require("express"); -> Antiga importação para o JS
const listaDeClientes = [];

const host = "0.0.0.0";
const porta = 3000;
var autenticado = false;
const app = express();

//Possibilita a comunicação com o ESTADO (stateful)
app.use(session({
    secret:"M1nH4Ch4v3S3cR3t4",
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge: 1000*60*15,
        httpOnly:true,
    }
}
))

//Permite o compartilhamento com o ambiente externo ou CLIENTE de arquivos ou dados estático a partir de um diretório
app.use(express.static("./publico"));


// Configurar os parâmetros recebidos pela URL (QS ou QueryString)
// QS -> TRUE : MAIS PODEROSO PARA LIDAR COM PARÂMETROS DE REQUISIÇÃO, serializando e armazendo em um repositório local para recuperá-lo.
// Query String -> FALSE
app.use(express.urlencoded({extended:true}));   



app.post("/login", (requisicao,resposta) =>{
    // Desestruturação JS
    let conteudo = ``;
    let { userID, Senha } = requisicao.body; 
    /* -> Em resumo, desmonta o objeto, criando variáveis menores que recebem os valores respectivos aos atributos q refenciam 
    Seria o mesmo que:
        let email = requisicao.body.userID;
        let senha = requisicao.body.Senha; */
    if(userID === "admin@dot.com" && Senha == "12345"){
        requisicao.session.autenticado = true;
        resposta.redirect("/menu.html")
    }
    else {
        conteudo = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>LOGIN</title>
            <link href="./style/css/bootstrap.min.css" rel="stylesheet">
            <link rel="stylesheet" href="./style/index.css">
        </head>
        <body>
            <section class="vh-100">
                <div class="container py-5 h-100">
                  <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="col-md-8 col-lg-7 col-xl-6">
                      <img src="./imagens/draw2.svg"
                        class="img-fluid" alt="Phone image">
                    </div>
                    <div class="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                      <form method="post" action="/login">
                        <!-- Email input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                          <input type="email" id="email" class="form-control form-control-lg" name="userID" value="${userID}"/>
                          <label class="form-label" for="form1Example13">Email</label>
                        </div>
              
                        <!-- Password input -->
                        <div data-mdb-input-init class="form-outline mb-4">
                          <input type="password" id="private" class="form-control form-control-lg" name="Senha" value="${Senha}"/>
                          <label class="form-label" for="form1Example23">Senha</label>
                        </div>
              
                        <div class="d-flex justify-content-around align-items-center mb-4">
                          <!-- Checkbox -->
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="PERSISTENCE" name="Remb" checked />
                            <label class="form-check-label" for="form1Example3"> Lembre de mim </label>
                          </div>
                          <a href="#!">Esqueceu a sua senha?</a>
                        </div>
              
                        <!-- Submit button -->
                        <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg btn-block m-5">LOGAR</button>
              
                        <div class="divider d-flex align-items-center my-4">
                          <p class="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                        </div>
              
                        <a data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" style="background-color: #3b5998" href="#!"
                          role="button">
                          <i class="fab fa-facebook-f me-2"></i>Continue com o Facebook
                        </a>
                        <a data-mdb-ripple-init class="btn btn-primary btn-lg btn-block" style="background-color: #55acee" href="#!"
                          role="button">
                          <i class="fab fa-twitter me-2"></i>Continue com o Twitter</a>
                      </form>
                      <div class="alert alert-danger text-center my-2">
                          Usuário ou senha incorretos !
                      </div>
                    </div>
                  </div>
                </div>
              </section>
        </body>
        </html>`;
        resposta.send(conteudo);
    }
    resposta.end();
    // if(localStorage.getItem("clientes")){
    //     listaDeClientes = JSON.parse(localStorage.getItem("clietes"));
    // }
})

app.use(verificarAutenticacao,express.static("./privado"));
//Daqui pra baixo é o inferno

app.get("/logout", (requisicao,resposta) =>{ 
    requisicao.session.destroy();    
    resposta.redirect("/login.html");
    resposta.end();                                                     
});

//Método de ESCUTA do Server
app.listen(porta, host, () =>{
    console.log(`Servidor em execução em http://${host}:${porta}`)
})
