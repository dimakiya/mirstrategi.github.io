class Alliance {
  constructor(name, founderId) {
    this.id = Date.now();
    this.name = name;
    this.founderId = founderId;
    this.members = [founderId];
  }

  addMember(countryId) {
    if (!this.members.includes(countryId)) {
      this.members.push(countryId);
      return true;
    }
    return false;
  }
}

class War {
  constructor(attackerId, targetRegionId) {
    this.id = Date.now();
    this.attacker = attackerId;
    this.targetRegionId = targetRegionId;
    this.startDate = new Date();
    this.status = 'siege';
    this.siegeProgress = 0;
    this.calledAllies = [];

    this.playBattleSound();
  }

  playBattleSound(){
    const audio = new Audio("assets/sounds/batle.mp3");
    audio.volume = 0.7;
    
  }

  updateSiege(daysPassed) {
    this.siegeProgress += daysPassed * 5;
    if (this.siegeProgress >= 100) {
      this.resolveBattle();
    }
  }

  resolveBattle() {
    const attacker = game.countries.find(c => c.id === this.attacker);
    const defenderRegion = map.worldMap.regions.find(r => r.id === this.targetRegionId);
    const defender = game.countries.find(c => c.id === defenderRegion.owner);

    const outcome = this.calculateBattleOutcome(attacker, defender);

    if (outcome.winner === this.attacker) {
      map.setRegionOwner(this.targetRegionId, this.attacker);
      alert(`Регион ${defenderRegion.name} захвачен!`);
    }

    this.status = 'ended';
  }

  calculateBattleOutcome(attacker, defender) {
    let attackerStrength = attacker.army * 0.8 + attacker.technologyLevel * 100;
    let defenderStrength = defender.army + defender.fortifications * 50;

    const randomFactor = Math.random() * 0.4 + 0.8;
    const result = attackerStrength * randomFactor > defenderStrength;

    return {
      winner: result ? attacker.id : defender.id,
      casualties: {
        attacker: Math.floor(attacker.army * (result ? 0.2 : 0.5)),
        defender: Math.floor(defender.army * (result ? 0.6 : 0.3))
      }
    };
  }
}
