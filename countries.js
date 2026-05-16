class Country {
  constructor(id, name, color, flagUrl) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.flagUrl = flagUrl;
    this.population = 0;
    this.money = 0;
    this.army = 0;
    this.regions = [];
    this.alliances = [];
    this.activeWars = [];
  }

  changeName(newName) {
    this.name = newName;
  }

  changeColor(newColor) {
    this.color = newColor;
  }

  changeFlag(newFlagUrl) {
    this.flagUrl = newFlagUrl;
  }
}

const COUNTRY_TEMPLATES = {
  ESP: { name: "Испания", color: "#E8000D", flag: "spain.png" },
  PRT: { name: "Португалия", color: "#006633", flag: "portugal.jpg" },
  AND: { name: "Андорра", color: "#2E57A4", flag: "andorra.png" }
};

export { Country, COUNTRY_TEMPLATES };
