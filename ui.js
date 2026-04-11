const ui = {
  updateStats() {
    document.getElementById('population').textContent = utils.formatNumber(game.population);
    document.getElementById('money').textContent = `$${utils.formatNumber(game.money)}`;
    document.getElementById('army').textContent = utils.formatNumber(game.army);
  },

  renderAreasList() {
    const areasList = document.getElementById('areas-list');
    areasList.innerHTML = '';

    map.worldMap.areas.forEach(area => {
      const areaElement = document.createElement('div');
      areaElement.className = 'area-card';
      areaElement.innerHTML = `
        <h4>${area.name}</h4>
        <p>Доли: ${this.formatOwnership(area.ownership)}</p>
        <button onclick="ui.showAreaDetails('${area.id}')">Детали</button>
      `;
      areasList.appendChild(areaElement);
    });
  },

  formatOwnership(ownership) {
    return Object.entries(ownership).map(([country, percent]) =>
      `${country}: ${percent}%`
    ).join(', ');
  },

  showAreaDetails(areaId) {
    const area = map.worldMap.areas.find(a => a.id === areaId);
    const regions = map.worldMap.regions.filter(r => r.areaId === areaId);

    let detailsHTML = `
      <h3>${area.name}</h3>
      <p>Владение: ${this.formatOwnership(area.ownership)}</p>
      <div id="region-list-in-area">
    `;

    regions.forEach(region => {
      detailsHTML += `
        <div class="region-card">
          <p>${region.name}</p>
          <p>Население: ${utils.formatNumber(region.population)}</p>
          <p>Владелец: ${region.owner || 'Нейтрален'}</p>
        </div>
      `;
    });

    detailsHTML += '</div>';
    document.getElementById('area-details').innerHTML = detailsHTML;
    document.getElementById('area-details').style.display = 'block';
  },

  declareWar() {
    // Здесь логика объявления войны
    alert('Выберите регион для объявления войны!');
  }
};
