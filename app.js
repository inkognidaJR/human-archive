
// Находим элементы HTML
const timer = document.querySelector(".citizen__auction-timer");
const input = document.querySelector(".citizen__auction-input");
const button = document.querySelector(".citizen__auction-button");
const myBid = document.querySelector(".citizen__auction-myBid");

// Начальное время: 2 часа 20 минут 46 секунд
let timeLeft = 8446;

// Функция отображения ставки
function displayMyBid(bid) {

    // Создаём контейнер ставки
    const bidElement = document.createElement("div");
    bidElement.className = "citizen__auction-userBid";

    // Создаём текст ставки
    const bidText = document.createElement("p");
    bidText.textContent = `YOU — ${Number(bid).toLocaleString("ru-RU")} $`;

    // Создаём кнопку удаления
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "DELETE";
    deleteButton.className = "citizen__auction-delete";

    // Добавляем элементы в контейнер
    bidElement.appendChild(bidText);
    bidElement.appendChild(deleteButton);

    // Добавляем ставку на страницу
    myBid.replaceChildren(bidElement);

    // Обрабатываем удаление ставки
    deleteButton.addEventListener("click", () => {
        bidElement.remove();
        localStorage.removeItem("myBid");
    });
}


// Получаем сохранённую ставку
const savedBid = localStorage.getItem("myBid");

// Если ставка существует — показываем её
if (savedBid !== null) {
    displayMyBid(savedBid);
}


// Запускаем таймер
const auctionInterval = setInterval(() => {

    if (timeLeft <= 0) {
        clearInterval(auctionInterval);
        timer.textContent = "AUCTION CLOSED";
        return;
    }

    timeLeft--;

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    const formattedTime =
        String(hours).padStart(2, "0") + ":" +
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    timer.textContent = formattedTime;

}, 1000);


// Обрабатываем нажатие PLACE BID
button.addEventListener("click", () => {

    const bidValue = Number(input.value);

    // Проверяем ставку
    if (input.value.trim() === "" || !Number.isFinite(bidValue) || bidValue <= 0) {
        alert("ENTER A VALID BID");
        input.focus();
        return;
    }

    // Сохраняем ставку
    localStorage.setItem("myBid", bidValue);

    // Показываем ставку
    displayMyBid(bidValue);

    // Очищаем поле ввода
    input.value = "";

});
