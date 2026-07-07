const utils = {
  getCountryColor(countryId) {
    const colors = {
      'ITA': '#008000',
      'HRV': '#FF0000',
      'SVN': '#0000FF',
      'ROM': '#FFA500',
      'neutral': '#CCCCCC'
    };
    return colors[countryId] || colors['neutral'];
  },

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  },

  randomEvent() {
    const events = [
      { text: 'Эпидемия! Население уменьшилось.', effect: () => { game.population -= 50000; game.money -= 200000; } },
      { text: 'Открытие нефти! Доходы выросли.', effect: () => { game.money += 2000000; } }
    ];
    const event = events[Math.floor(Math.random() * events.length)];
    alert(event.text);
    event.effect();
    storage.saveGame();
  }
};
