// Seleciona os elementos do DOM
let crash = document.querySelector('#crash');
let start = document.querySelector('.start');
let stopp = document.querySelector('.stop');
let saldo = document.querySelector('#saldo');
let aposta = document.querySelector('#aposta');
let loader = document.querySelector('.fake-load')

// Define o valor do saldo usando o localStorage
saldo.innerHTML = "R$ " + parseFloat(localStorage.getItem('lSaldo')).toFixed(1);

// Variáveis para controlar o contador e a lógica do jogo
let rep = 0;
let timerId;
let maxValue = 0;
let aperta = true;

// Função para atualizar o contador
function updateCounter(max) {
    if (rep <= max) {
        // Atualiza o contador com uma casa decimal
        crash.innerHTML = rep.toFixed(1);
        rep += 0.1;
        // Configura um temporizador para chamar a função novamente após 100ms
        timerId = setTimeout(() => updateCounter(max), 100);
    } else {
        // Quando o contador atinge o valor máximo
        // Remove o loader
        loader.classList.remove('loader')
        if (aperta) {
            // Calcula a perda no saldo e atualiza o localStorage e a exibição
            let perda = parseFloat(localStorage.getItem('lSaldo')) - aposta.value;
            localStorage.setItem('lSaldo', perda.toFixed(1));
            saldo.innerHTML = "R$ " + localStorage.getItem('lSaldo');
        }
        aperta = true;
    }
}

// Event listener para o botão "Start"
start.addEventListener('click', function () {
    stopp.classList.remove('apertado')
    // Verifica se os campos não estão vazios e a aposta é válida
    if (aposta.value != "") {
        // Verifica se a aposta é valida
        if (aposta.value > 0 && aposta.value <= parseFloat(localStorage.getItem('lSaldo'))) {
            // Adicona o loader
            loader.classList.add('loader')
           
            // Gera um valor máximo aleatório para o jogo
            maxValue = parseFloat(((Math.random() * 10) + 1).toFixed(1));
            //alert('Valor máximo: ' + maxValue);

            // Inicializa o contador e ativa a lógica do jogo
            rep = 1;
            //alert('Início: ' + rep);
            clearTimeout(timerId); // Limpa qualquer temporizador pendente
            updateCounter(maxValue);
        }else{
            alert('Valores inválidos')
        }
    } else {
        alert('Valores vazios');
    }
});

// Event listener para o botão "Stop"
stopp.addEventListener('click', function () {
    // Quando o botão "Stop" é pressionado
    if (rep > 0 && rep <= maxValue && aperta == true) {
        // Calcula o ganho no saldo e atualiza o localStorage e a exibição
        let ganho = parseFloat(localStorage.getItem('lSaldo')) + aposta.value * rep;
        localStorage.setItem('lSaldo', ganho.toFixed(1));
        saldo.innerHTML = "R$ " + localStorage.getItem('lSaldo');
        aperta = false;
        stopp.classList.add('apertado')
    }
});
