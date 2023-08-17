// Variável para armazenar o saldo do jogador
let meuSaldo = parseInt(localStorage.getItem('lSaldo'))

// Elementos do DOM
let btn = document.querySelector('#btn'); // Botão de jogar
let saldo = document.querySelector('#saldo'); // Elemento que exibe o saldo
let img = document.querySelector('#dado'); // Imagem do dado
let paragrafo = document.querySelector('#valor-txt'); // Parágrafo que exibe o valor do dado
let aposta = document.querySelector('#valorDado'); // Campo de entrada para a aposta
let banca = document.querySelector('#banca'); // Campo de entrada para a banca

// Inicializa o saldo exibido
saldo.textContent = 'R$ ' + String(localStorage.getItem('lSaldo'));

// Adiciona um ouvinte de eventos ao botão de jogar
btn.addEventListener('click', function () {
    // Converte o valor para Int
    let bancaValor = parseInt(banca.value);

    if (bancaValor <= 0 || bancaValor > meuSaldo || banca.value == "") {
        alert('valores invalidos')
    }else if(meuSaldo <= 0){
        alert('Você perdeu tudo!!')
    }else {
        // Gera um número aleatório entre 1 e 6 para simular o lançamento do dado
        let numr = Math.floor(Math.random() * 6) + 1;

        // Adiciona a classe 'giro' para dar efeito de rotação à imagem do dado
        img.classList.add('giro');

        // Define uma pausa com setTimeout para simular o giro do dado
        setTimeout(() => {
            // Atualiza o valor exibido no parágrafo
            paragrafo.textContent = String(numr);

            // Atualiza a imagem do dado
            img.src = `../../images/${numr}.png`;

            // Remove a classe 'giro' para parar a animação
            img.classList.remove('giro');

            let apostaValor = parseInt(aposta.value);

            // Verifica se a aposta é igual ao valor do dado
            if (apostaValor === numr) {
                // Soma o valor da banca multiplicada por 2 no saldo
                meuSaldo += bancaValor * 2

                // Atualiza o saldo exibido
                saldo.textContent = 'R$ ' + String(meuSaldo);
                localStorage.setItem('lSaldo', String(meuSaldo))

                // alert('Você ganhou!Seu novo saldo: R$ ' + String(meuSaldo));
            } else {
                // Subtrai o valor da banca do saldo
                meuSaldo -= bancaValor;

                // Atualiza o saldo exibido
                saldo.textContent = 'R$ ' + String(meuSaldo);
                localStorage.setItem('lSaldo', String(meuSaldo))

                // Exibe mensagem sobre o novo saldo
                // alert('Você perdeu! Seu novo saldo: R$ ' + String(meuSaldo));
            }
        }, 400);
    }
});

