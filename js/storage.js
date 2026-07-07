const storage = {
  saveGame() {
    const saveData = {
      countryId: game.countryId,
      population: game.population,
      money: game.money,
      army: game.army,
      alliances: game.alliances,
      activeWars: game.activeWars,
      worldMap: map.worldMap
    };
    localStorage.setItem('nationGameSave', JSON.stringify(saveData));
  },

  loadGame() {
    const saved = localStorage.getItem('nationGameSave');
    if (saved) {
      const data = JSON.parse(saved);
      game.countryId = data.countryId;
      game.population = data.population;
      game.money = data.money;
      game.army = data.army;
      game.alliances = data.alliances || [];
      game.activeWars = data.activeWars || [];
      if (data.worldMap) {
        map.worldMap = data.worldMap;
      }
    }
  }
};
