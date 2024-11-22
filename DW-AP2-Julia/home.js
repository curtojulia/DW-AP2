const url = "https://botafogo-atletas.mange.li/2024-1/";
const elencoSelect = document.getElementById("elenco-select");
const conteiner = document.getElementById("conteiner");
const barraDeBusca = document.getElementById("busca");
const filtros = document.getElementById("filtros");
const botaoSair = document.getElementById('sair');
let elencoAtual = [];


const botoesFiltro = document.querySelectorAll(".botao"); 

botaoSair.addEventListener('click', () => {
    window.location.href = 'index.html';  // Altere para a URL desejada para a página de início
});

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", (e) => {
        const elenco = e.target.dataset.elenco;
        atualizaElenco(elenco);  // Chama a função de atualização com o valor do botão
    });
});

// Função para buscar JSON da URL
async function pega_json(endpoint) {
  const response = await fetch(endpoint);
  return response.json();
}

async function atualizaElenco(elenco) {
    // Limpa o contêiner
    conteiner.innerHTML = '';

    const elencoNormalizado = elenco.charAt(0).toUpperCase() + elenco.slice(1).toLowerCase();   // para tirar os epaços, letra maisculas.. diferenças 
    
    try { // para identificar erros
        if (elencoNormalizado === "Completo") {
            console.log('Carregando elenco completo...');
            const [feminino, masculino] = await Promise.all([
                pega_json(`${url}feminino`),
                pega_json(`${url}masculino`)
            ]);

            if (Array.isArray(feminino) && Array.isArray(masculino)) {  // para ver se são arrays
                elencoAtual = [...feminino, ...masculino];            // para combinar as duas arrays, fem e masc 
                displayElenco(elencoAtual);  // para exibir no formato de cartão
            }

        } else if (elencoNormalizado === "Feminino") {
            console.log('Carregando elenco feminino...');
            const feminino = await pega_json(`${url}feminino`);  // pega a api com o elenco feminino

            if (Array.isArray(feminino)) {
                elencoAtual = feminino;  //confere se é um array para funcionar o código
                displayElenco(elencoAtual);
            } else {
                console.error("Dados do feminino não são um array:", feminino); // se não for for um array da erro
            }

        } else if (elencoNormalizado === "Masculino") {
            console.log('Carregando elenco masculino...');
            const masculino = await pega_json(`${url}masculino`);

            if (Array.isArray(masculino)) {
                elencoAtual = masculino;
                displayElenco(elencoAtual);
            } else {
                console.error("Dados do masculino não são um array:", masculino);
            }
        }
    } catch (error) {
        console.error("Erro ao obter dados do servidor:", error);
    }
}
    elencoSelect.addEventListener("change", (e) => {
        const elenco = e.target.value;
        atualizaElenco(elenco);
    });

    function displayElenco(atletas) {
        conteiner.innerHTML = ''; // Limpa o contêiner
        atletas.forEach((atleta) => conteiner.appendChild(montaCard(atleta))); // Exibe os cartões dos atletas
    }

    barraDeBusca.addEventListener("input", () => {
        const searchTerm = barraDeBusca.value.toLowerCase();
        const elencoFiltrado = elencoAtual.filter((atleta) =>
            atleta.nome.toLowerCase().includes(searchTerm)
        );
        displayElenco(elencoFiltrado); // Exibe o elenco filtrado
    });
// https://botafogo-atletas.mange.li/docs 


const options1 = [
    {value: 'Masculino', label: 'Masculino'},
    {value: 'Feminino', label: 'Feminino'},
    {value: 'Completo', label: 'Completo'},
  ]

document.getElementById('sair').onclick = () => sessionStorage.removeItem('logado');

const manipulaClick = (e) => {
    console.log(e.currentTarget);  // target é um elemento
    const id = e.currentTarget.dataset.id  // esse é o article
    const url =` detalhes.html?id=${id}`;
  
    
    document.cookie = `id=${id}`;
    document.cookie = `altura=${e.currentTarget.dataset.altura}`;
    document.cookie = `elenco=${e.currentTarget.dataset.elenco}`;

    //localStorage
    localStorage.setItem('id', id)
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));  // representacao em string 

    //sessionstorage
    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));
    sessionStorage.setItem('elenco', JSON.stringify(e.currentTarget.dataset));

    


    window.location = url; // pra ir para url indicada 
} 

const montaCard = (atleta) =>{
    const cartao = document.createElement("div");
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");
    const link = document.createElement("a");

    nome.innerHTML = atleta.nome;
    nome.style.fontFamily = 'sans-serif';
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);


    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;  
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

