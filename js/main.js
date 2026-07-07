import { MapRenderer } from './map.js';
import worldMapData from '../data/world-map.json';

class NationGame {
  constructor() {
    this.countryId = null;
    this.population = 0;
    this.money = 0;
    this.army = 0;

    // Создаём рендерер карты — теперь он отвечает за отрисовку
    this.mapRenderer = new MapRenderer();

    // Инициализация
    this.init();
  }

  init() {
    // Загружаем сохранение
    storage.loadGame();

    // Передаём данные карты в рендерер
    this.mapRenderer.loadMap(worldMapData);

    // Обновляем интерфейс
    ui.updateStats();

    // Первый рендер
    this.render();

    // Запуск игрового цикла (каждую секунду)
    setInterval(() => this.gameLoop(), 1000);
  }

  gameLoop() {
    // Ежесекундные обновления
    this.updateWars();
    this.render();
  }

  updateWars() {
    // Логика обновления войн между странами
    // (реализуется отдельно)
  }

  render() {
    // Делегируем отрисовку рендереру карты
    this.mapRenderer.drawMap();
  }
}

// Глобальная переменная для доступа
window.game = new NationGame();
