let saldo = document.querySelector('#saldo')

localStorage.setItem('lSaldo', '50')

saldo.innerHTML = 'R$ ' + localStorage.getItem('lSaldo')