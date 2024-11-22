console.log("Script carregado!");

const url= `home.html`;

const botaoClick = () =>{
    cartao.onclick = manipulaClick;
}
const manipulaBotao = () => {          // para criar a senha, logar e deslogar
    const texto = document.getElementById('senha').value;
    if (hex_sha256(texto) === "ded6a687514227ff822d40bd397f30f5ae9132487ad6c846599131c740d784f0"){
        sessionStorage.setItem("logado", "sim");
        window.location.href = url;
        
    } else {
        alert("Você errou a senha!");
    }
}

document.getElementById('botao').onclick = manipulaBotao;

const manipulaClick = (e) => {
    console.log(e.currentTarget);  // target é um elemento
    const id = e.currentTarget.dataset.id  // esse é o article
    const url =` home.html`;
    
}