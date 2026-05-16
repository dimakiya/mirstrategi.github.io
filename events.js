/**
 * Модуль событий игры: восстания, случайные события, уведомления
 */
const events = {
  /**
   * Запуск восстания в указанном регионе
   * @param {number} regionId — ID региона для восстания
   */
  startRebellion(regionId) {
    const region = map.worldMap.regions.find(r => r.id === regionId);
    if (!region) {
      console.error('Регион не найден:', regionId);
      return;
    }

    // Воспроизводим звук восстания
    const audio = new Audio('assets/sounds/rebellion.mp3');
    audio.play().catch(e => console.warn('Звук восстания не воспроизведён:', e));

    // Создаём новую страну для игрока
    const newCountry = new Country(
      `PLAYER_${Date.now()}`,
      "Восставшие",
      "#FF0000",
      "andora.png"
    );

    // Обновляем владение регионом
    region.owner = newCountry.id;
    newCountry.regions.push(regionId);

    // Добавляем страну в глобальный список
    game.countries.push(newCountry);
    game.currentCountry = newCountry;

    // Уведомление игрока
    this.showNotification(`Успешно поднято восстание в ${region.name}! Теперь вы — "${newCountry.name}"`);

    // Сохраняем прогресс
    storage.saveGame();

    // Перерисовываем карту
    map.drawMap();
  },

  /**
   * Проверка возможности восстания в регионе
   * @param {number} regionId — ID региона
   * @returns {boolean} — можно ли поднять восстание
   */
  canStartRebellion(regionId) {
    const region = map.worldMap.regions.find(r => r.id === regionId);
    return region && region.owner && region.owner !== game.currentCountry?.id;
  },

  /**
   * Случайные события игры
   */
  randomEvent() {
    const eventsList = [
      {
        text: "Экономический бум! Доходы удвоены в этом месяце.",
        effect: () => {
          game.currentCountry.money *= 2;
          this.showNotification("Экономический бум!", "economy");
        }
      },
      {
        text: "Военный переворот! Армия увеличена на 50 000.",
        effect: () => {
          game.currentCountry.army += 50000;
          this.showNotification("Армия усилена!", "army");
        }
      },
      {
        text: "Эпидемия! Население сократилось на 10 %.",
        effect: () => {
          const reduction = Math.floor(game.currentCountry.population * 0.1);
          game.currentCountry.population -= reduction;
          this.showNotification("Эпидемия! Население уменьшилось.", "warning");
        }
      },
      {
        text: "Туристический сезон! Доходы от туризма увеличены.",
        effect: () => {
          // Увеличиваем доход от туризма во всех регионах
          map.worldMap.regions
            .filter(r => r.owner === game.currentCountry.id)
            .forEach(region => {
              if (region.resources.tourism) {
                region.resources.tourism *= 1.2;
              }
            });
          this.showNotification("Туристический бум!", "tourism");
        }
      },
      {
        text: "Природные богатства! Обнаружены новые ресурсы.",
        effect: () => {
          game.currentCountry.money += 200000;
          this.showNotification("Новые ресурсы обнаружены!", "resources");
        }
      }
    ];

    const randomIndex = Math.floor(Math.random() * eventsList.length);
    const event = eventsList[randomIndex];

    // Показываем уведомление
    this.showNotification(event.text, "event");

    // Применяем эффект
    event.effect();

    // Сохраняем изменения
    storage.saveGame();
  },

  /**
   * Показ уведомления игроку
   * @param {string} message — текст уведомления
   * @param {string} type — тип уведомления (economy, army, warning и т. д.)
   */
  showNotification(message, type = "info") {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
      notification.remove();
    }, 5000);
  },

  /**
   * Периодическая проверка событий (каждый игровой день)
   */
  checkDailyEvents() {
    // Случайное событие с вероятностью 20 % в день
    if (Math.random() < 0.2) {
      this.randomEvent();
    }
  },

  /**
   * Инициализация системы событий
   */
  init() {
    // Запускаем периодическую проверку событий каждую секунду (для теста)
    setInterval(() => {
      this.checkDailyEvents();
    }, 1000); // В реальной игре интервал можно увеличить

    console.log('Система событий инициализирована');
  }
};

// Автоинициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
  events.init();
});
