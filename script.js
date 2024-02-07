// Chama a função quando a página é carregada
window.onload = function () {
    showLocation();
    showTime();
    showDateNow();
};

function showLocation() {
    // Verifica se o navegador suporta geolocalização
    if ("geolocation" in navigator) {
        // Solicita a localização atual do usuário
        navigator.geolocation.getCurrentPosition(function (position) {
            // Obtém as coordenadas de latitude e longitude
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            // Usa as coordenadas para obter a cidade atual usando uma API de geocodificação reversa (exemplo: API do OpenStreetMap)
            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
            // Faz uma solicitação GET para a API do OpenStreetMap
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Extrai o nome da cidade da resposta da API
                    const cidade = data.address.city;
                    // Exibe a cidade atual
                    document.getElementById("cidade-info").innerHTML += `Você está em ${cidade}.`;
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao obter a cidade:', error);
                });
        });
    } else {
        console.log('Geolocalização não é suportada pelo seu navegador.');
    }
}

setInterval(showTime, 1000);
function showTime() {
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    am_pm = "AM";

    if (hour > 12) {
        hour -= 12;
        am_pm = " PM";
    }
    if (hour == 0) {
        hr = 12;
        am_pm = " AM";
    }

    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;

    let currentTime = hour + ":"
        + min + ":" + sec + am_pm;

    document.getElementById("clock-info").innerHTML = currentTime;
}

function showDateNow() {
    // Array para converter o número do mês para o nome do mês
    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    // Obtendo a data de hoje
    const hoje = new Date();

    // Obtendo o dia, o mês e o ano
    const dia = hoje.getDate();
    const mes = meses[hoje.getMonth()];
    const ano = hoje.getFullYear();

    // Construindo a string da data no formato desejado
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    document.getElementById("data-info").innerHTML = dataFormatada;
}