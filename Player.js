class Player{
  constructor(name, id, lvl = 1, xp = 0, positionX = 0, positionY = 0, atk = 2, hp = 10, gold = 5){
    this.name = name;
    this.userId = id;
    this.lvl = lvl;
    this.xp = xp;
    this.positionX = positionX;
    this.positionY = positionY;
    this.atk = atk;
    this.hp = hp;
    this.gold = gold;
    this.map = [[`#`,`#`,`#`,`#`,`#`,`#`,`#`,`H`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],
                [`#`,`#`,`#`,`#`,`#`,`#`,`#`,`#`],]
  }

  checkPosition(){
    if(this.hp > 0)this.map[this.positionY][this.positionX] = "@";
  }
  clearPosition(){
    this.map[this.positionY][this.positionX] = "#";
  }
  right(){
    if(this.map[this.positionY][this.positionX + 1] === 'H'){
      if(this.gold>=4) {this.hp += 10; this.gold -=4}
    }
    else{
      this.positionX++;
    }
  }
  left(){
    this.positionX--;
  }
  down(){
    this.positionY++;
  }
  up(){
    if(this.map[this.positionY - 1][this.positionX] === 'H'){
      this.hp += 10;
    }
    else{
      this.positionY--;
    }

  }


}

module.exports = Player
