let dices = document.querySelectorAll('.dice');
let saldo = document.querySelector('#saldo');
let aposta = document.querySelector('#valor-aposta')
saldo.innerHTML = `R$ ${localStorage.getItem('lSaldo')}`
let numr;

numr = ale();

dices.forEach((dice, index) => {
    dice.addEventListener('click', () => {
        // Verifica se os valores não são maiores do que o saldo
        if (aposta.value > 0 && aposta.value <= Number(localStorage.getItem('lSaldo'))) {
            // Acerta
            if (numr != index + 1 && numr + 1 != index + 1 && numr + 2 != index + 1) {
                
                numr = ale();
                dice.classList.remove('neutro')
                dice.classList.add('flip')
                dice.classList.add('acerta')
                // Atualiza o valor do saldo
                let ganho = aposta.value * 3 + Number(localStorage.getItem('lSaldo'))
                localStorage.setItem('lSaldo', String(ganho.toFixed(1)))
                saldo.innerHTML = `R$ ${localStorage.getItem('lSaldo')}`

                setTimeout(() => {
                    dice.classList.remove('flip')
                    dice.classList.remove('acerta')
                    dice.classList.add('neutro')
                }, 1000);
                // Erra
            } else {
                ale();
                numr = ale();
                dice.classList.remove('neuto')
                dice.classList.add('flip')
                dice.classList.add('erra')
                // Atualiza o valor do saldo
                let perda = Number(localStorage.getItem('lSaldo')) - Number(localStorage.getItem('lSaldo')) / 2
                localStorage.setItem('lSaldo', String(perda.toFixed(1)))
                saldo.innerHTML = `R$ ${localStorage.getItem('lSaldo')}`

                setTimeout(() => {
                    dice.classList.remove('flip')
                    dice.classList.remove('erra')
                    dice.classList.add('neutro')
                }, 1000);
            }
        } else {
            alert('Valores inválidos')
        }
    });
});

function ale() {
    let numr = Math.floor(Math.random() * 9) + 1;
    return numr;
}

