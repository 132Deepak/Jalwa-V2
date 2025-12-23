const socket = io();

// Generate Numbers 0-9
const numbersGrid = document.getElementById('numbers');
for (let i = 0; i <= 9; i++) {
    let div = document.createElement('div');
    div.className = 'num-circle';
    div.innerText = i;
    div.onclick = () => placeBet(i);
    numbersGrid.appendChild(div);
}

socket.on('timerUpdate', (data) => {
    document.getElementById('timer').innerText = data.timeLeft < 10 ? '0' + data.timeLeft : data.timeLeft;
    document.getElementById('period-id').innerText = data.period;
});

socket.on('gameResult', (res) => {
    const list = document.getElementById('history-list');
    const row = `<tr>
        <td>${res.period}</td>
        <td style="color:${res.color.includes('green') ? 'green' : 'red'}">${res.number}</td>
        <td>${res.size}</td>
        <td><span style="height:10px;width:10px;border-radius:50%;display:inline-block;background:${res.color.split('-')[0]}"></span></td>
    </tr>`;
    list.innerHTML = row + list.innerHTML;
});

function placeBet(type) {
    alert("Bet placed on: " + type + "\n(असली पैसों के लिए Backend में MongoDB जोड़ना होगा)");
}
