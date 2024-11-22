const params = new URLSearchParams(window.location.search)
const id = params.get("id");
const link = document.querySelector('home.html')

const criaBotaoFechar = () => {
    const botao = document.createElement("button");
    botao.id = "fechar";
    botao.textContent = "X";
    botao.addEventListener("click", () => {
        window.location.href = "home.html";
    });

    document.body.appendChild(botao); // Adiciona o botão ao body
};

criaBotaoFechar();

const pega_json = async (caminho) => {   //os dados so vao aparecer no programa depois disso tudo abaixo
    try {   // mais preciso para capturar erros do que um if/else
        const resposta = await fetch(caminho); 
        if (!resposta.ok) {
            throw new Error('Erro ao obter os dados da API');
        }
        const dados = await resposta.json();
        return dados;                         // essa funcao vai na api e pega os dados
} catch (erro) {
    // Se ocorrer um erro, exibe uma mensagem na tela
    document.body.innerHTML = `<h1>Ocorreu um erro: ${erro.message}</h1>`;
    return null;  // Retorna null em caso de erro
}
};

const montaPagina = (dados) => {
    const body = document.body;
    body.innerHTML = "";

    criaBotaoFechar();

    
    const nome = document.createElement("h1");
    nome.innerHTML = dados.nome;
    body.appendChild(nome);
    
    const imagem = document.createElement("img");
    imagem.src = dados.imagem;
    body.appendChild(imagem);
    
    const descri = document.createElement("p");
    descri.innerHTML = dados.detalhes.trim(); // para remover espaços extras
    body.appendChild(descri);
    

    const n_jogos = document.createElement("p");
    n_jogos.innerHTML = dados.n_jogos;
    body.appendChild(n_jogos);

    const posicao = document.createElement("p");
    posicao.innerHTML = `Posição: ${dados.posicao}`;
    body.appendChild(posicao);

    const nascimento = document.createElement("p");
    nascimento.innerHTML = `Data de Nascimento: ${dados.nascimento}`;
    body.appendChild(nascimento);

    const naturalidade = document.createElement("p");
    naturalidade.innerHTML = `Naturalidade: ${dados.naturalidade}`;
    body.appendChild(naturalidade);

    const no_botafogo_desde = document.createElement("p");
    no_botafogo_desde.innerHTML =  `Está no Botafogo desde: ${dados.no_botafogo_desde}`;
    body.appendChild(no_botafogo_desde);

    // link.innerHTML = "fechar";
    // link.href = `home.html`;
    // cartao.appendChild(link)
};

if(sessionStorage.getItem('logado')){

    
    pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
        (r) => montaPagina(r)
        );
} else {
    document.body.innerHTML = '<h1>Você precisa estar logado para acessar essa página.</h1>';
}

const achacookie = (chave) => {   // parte que ajusta os detalhes so aparecerem se estiver logado                       
    const lista = document.cookie.split("; ");
    const par = lista.find(
        (e) => e.startsWith(`${chave}=`)
    )
    return par.split("=")[1]

};
console.log('altura:', achacookie('altura'));

const dadosSessionStorage = sessionStorage.getItem('dados');
const obj = JSON.parse(dadosSessionStorage);

console.log('número de jogos:', obj.nJogos);