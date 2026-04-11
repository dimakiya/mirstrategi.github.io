class MapRenderer {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.worldMap = null;
  }

  loadMap(mapData) {
    this.worldMap = mapData;
    this.generateRegions(); // Автоматически генерируем вершины, если их нет
    this.drawMap();
  }

  generateRegions() {
    this.worldMap.regions.forEach(region => {
      if (!region.vertices) {
        region.vertices = this.generateRandomPolygon();
      }
    });
  }

  generateRandomPolygon() {
    const centerX = Math.random() * this.canvas.width;
    const centerY = Math.random() * this.canvas.height;
    const numPoints = 5 + Math.floor(Math.random() * 5); // 5–9 вершин
    const vertices = [];

    for (let i = 0; i < numPoints; i++) {
      const angle = (i / numPoints) * 2 * Math.PI;
      const radius = 30 + Math.random() * 20; // 30–50 px
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      vertices.push([x, y]);
    }

    return vertices;
  }

  drawMap() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.worldMap.regions.forEach(region => {
      this.drawRegion(region);
    });
  }

  drawRegion(region) {
    const ownerColor = this.getOwnerColor(region.owner);

    // Начинаем путь для многоугольника
    this.ctx.beginPath();
    this.ctx.moveTo(region.vertices[0][0], region.vertices[0][1]);

    // Рисуем линии между вершинами
    for (let i = 1; i < region.vertices.length; i++) {
      this.ctx.lineTo(region.vertices[i][0], region.vertices[i][1]);
    }

    // Закрываем контур
    this.ctx.closePath();

    // Заливка цветом страны
    this.ctx.fillStyle = ownerColor;
    this.ctx.fill();

    // Контур (чёрный, толщина 2 px)
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Название региона по центру (вычисляем центр многоугольника)
    const center = this.calculatePolygonCenter(region.vertices);
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '12px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(region.name, center.x, center.y);
  }

  calculatePolygonCenter(vertices) {
    let sumX = 0, sumY = 0;
    vertices.forEach(point => {
      sumX += point[0];
      sumY += point[1];
    });
    return {
      x: sumX / vertices.length,
      y: sumY / vertices.length
    };
  }

  getOwnerColor(ownerId) {
    switch (ownerId) {
      case 'ESP': return '#E8000D';
      case 'PRT': return '#006633';
      case 'AND': return '#2E57A4';
      default: return '#888';
    }
  }

  updateRegion(regionId) {
    const region = this.worldMap.regions.find(r => r.id === regionId);
    if (!region) return;
    this.drawRegion(region);
  }
}

export { MapRenderer };