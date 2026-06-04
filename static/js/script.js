document.addEventListener('DOMContentLoaded', () => {
    // Burger menu toggle
    const burger = document.querySelector('.burger');
    const burgerCity = document.querySelector('.burger_city');

    if (burger) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.navigation').classList.toggle('open');
        });
    }

    if (burgerCity) {
        burgerCity.addEventListener('click', function() {
            this.classList.toggle('active');
            document.querySelector('.navigation').classList.toggle('open');
        });
    }


      // Ваш обліковий запис PayPal
      const PAYPAL_BUTTON_ID = "KMYNUU3WTZU6Q";
      const PAYPAL_DONATE_URL =
        "https://www.paypal.com/donate?hosted_button_id=" + PAYPAL_BUTTON_ID;
      const PAYPAL_EMAIL = "john.sinna@gmail.com"; // для довідки

      // Функція для відкриття PayPal в новому вікні
      function openPayPalDonation() {
        const loadingSpinner = document.getElementById("loading-spinner");
        if (loadingSpinner) {
          loadingSpinner.style.display = "block";
        }

        const width = 600;
        const height = 700;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;

        window.open(
          PAYPAL_DONATE_URL,
          "paypal-donation",
          `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`,
        );

        setTimeout(() => {
          if (loadingSpinner) {
            loadingSpinner.style.display = "none";
          }
        }, 1000);

        setTimeout(() => {
          showThankYouMessage();
        }, 2000);
      }

      // Функція для показу повідомлення подяки
      function showThankYouMessage() {
        const message = document.getElementById("thank-you-message");
        if (message) {
          message.style.display = "block";
          setTimeout(() => {
            message.style.display = "none";
          }, 5000);
        }
      }

      // Функція для ініціалізації оригінальної кнопки PayPal (прихованої)
      function initPayPalButton() {
        if (typeof PayPal !== "undefined" && PayPal.Donation) {
          try {
            PayPal.Donation.Button({
              env: "production",
              hosted_button_id: PAYPAL_BUTTON_ID,
              style: {
                label: "donate",
                size: "responsive",
                shape: "pill",
                color: "blue",
                layout: "vertical",
              },
            }).render("#paypal-donate-container");

            console.log("PayPal button initialized successfully");
          } catch (error) {
            console.error("Error initializing PayPal button:", error);
          }
        } else {
          console.log("PayPal SDK not loaded yet");
        }
      }

      // Ініціалізуємо PayPal та додаємо обробники подій
      initPayPalButton();

      const donateButtons = document.querySelectorAll('#donate-button-paypal');
      donateButtons.forEach((button) => {
        button.addEventListener("click", openPayPalDonation);
        button.style.opacity = "0";
        button.style.transform = "translateY(20px)";

        setTimeout(() => {
          button.style.transition = "all 0.6s";
          button.style.opacity = "1";
          button.style.transform = "translateY(0)";
        }, 200);
      });

      const qrImages = document.querySelectorAll('#qr-code-image');
      qrImages.forEach((qrImage) => {
        qrImage.addEventListener("click", openPayPalDonation);
      });

      // Додаємо підтримку клавіатури для доступності
      document.addEventListener("keydown", function (event) {
        if ((event.key === "d" || event.key === "D") && event.altKey) {
          openPayPalDonation();
        }
      });

      // Функція для відстеження успішного донату
      window.addEventListener("message", function (event) {
        if (event.origin.includes("paypal.com")) {
          if (event.data && event.data.type === "donation_complete") {
            showThankYouMessage();

            if (typeof gtag !== "undefined") {
              gtag("event", "donation", {
                event_category: "engagement",
                event_label: "paypal_donation",
              });
            }
          }
        }
      });

      // Обробка помилок
      window.onerror = function (msg, url, lineNo, columnNo, error) {
        console.error("Error: ", msg);
        return false;
      };


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


