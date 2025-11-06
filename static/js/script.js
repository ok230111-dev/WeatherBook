//Burger
document.querySelector('.burger').addEventListener('click', function() {
    this.classList.toggle('active'); //коли клік -> появляється active
    document.querySelector('.navigation').classList.toggle('open'); //коли 2 клік -> зникає active
})

document.addEventListener('DOMContentLoaded', () => {
    const settingsLink = document.getElementById('settings');
    const closeModal = document.getElementById('close-modal');
    const saveSettingsButton = document.getElementById("saveSettings");
    const modal = document.getElementById('settings-modal');
    const button_index = document.getElementById('button_index');
    const santabook_button = document.getElementById('santabook_button');
    const binary_translator = document.getElementById('binary_translator');
    let currentUnit = "C"; // Початковий вибір одиниці вимірювання

    // Перевірка на наявність елемента для відкриття модального вікна
    if (settingsLink) {
        // Відкриття модального вікна
        settingsLink.addEventListener('click', () => {
            modal.style.display = 'block';
        });
    }

    // Закриття модального вікна
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    // Функція для конвертації температури
    function convertTemperature(temp, unit) {
        if (isNaN(temp)) {
            console.log("Invalid temperature value:", temp);
            return temp; // Якщо температура не є числом, повертаємо її без змін
        }
        return unit === "fahrenheit" ? (temp * 9 / 5) + 32 : temp;
    }

    // Збереження налаштувань і оновлення температури
    if (saveSettingsButton) {
        saveSettingsButton.addEventListener("click", () => {
            const selectedUnit = document.getElementById('temperature-unit').value;
            currentUnit = selectedUnit; // Оновлюємо поточну одиницю вимірювання

            // Отримуємо поточну температуру з data-атрибуту
            const temperatureElement = document.querySelector(".weather-info .temperature");

            if (temperatureElement) {
                const currentTemp = parseFloat(temperatureElement.dataset.celsius); // Температура в Цельсіях

                // Перевірка на NaN перед конвертацією
                if (isNaN(currentTemp)) {
                    console.log("Invalid temperature value:", currentTemp);
                    return; // Якщо температура не є числом, не робимо нічого
                };

                // Конвертуємо температуру в залежності від вибраної одиниці
                const convertedTemp = selectedUnit === "fahrenheit" ? convertTemperature(currentTemp, "fahrenheit") : currentTemp;

                // Оновлюємо текст температури на сторінці
                temperatureElement.textContent = `${convertedTemp.toFixed(1)}°${selectedUnit === "fahrenheit" ? "F" : "C"}`;
            } else {
                console.log("Temperature element not found!");
            }

            // Закриваємо модальне вікно
            modal.style.display = "none";

            localStorage.setItem('temp_unit', selectedUnit);
        });
    }

    // Перевірка на наявність інших кнопок для переходів
    if (button_index) {
        button_index.addEventListener('click', function() {
            window.location.href = '/find_weather';
        });
    }

    if (santabook_button) {
        santabook_button.addEventListener('click', function() {
            window.location.href = 'https://letter-to-santa-95663.web.app/';
        });
    }

    if (binary_translator) {
        binary_translator.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
});


