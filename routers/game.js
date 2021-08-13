const express = require('express')
const router = express.Router( { mergeParams: true } )
const { Save } = require('../models');
const Player = require('../Player');

router.get('/:id', (req, res) =>{

  res.render('game',{
    map: req.app.locals.currentPlayer.map
  })
})

router.post('/:id', async (req, res) =>{

  const char = await Save.findOne({
    where: {
        name: req.params.id
    }
  })

  req.app.locals.currentPlayer = new Player(char.name, char.LoginId, char.lvl, char.xp, char.positionX, char.positionY, char.atk, char.hp, char.gold);

  req.app.locals.currentPlayer.checkPosition();

  res.redirect(`/game/${req.params.id}`)
})

router.post('/:id/move/Down', async (req, res) =>{

  if(Math.random() > 0.9) res.redirect(`/game/${req.params.id}/battle`);

 req.app.locals.currentPlayer.clearPosition();
 req.app.locals.currentPlayer.down();
 req.app.locals.currentPlayer.checkPosition();


  res.redirect(`/game/${req.params.id}`)
})
router.post('/:id/move/Up', async (req, res) =>{

if(Math.random() > 0.9) res.redirect(`/game/${req.params.id}/battle`);

 req.app.locals.currentPlayer.clearPosition();
 req.app.locals.currentPlayer.up();
 req.app.locals.currentPlayer.checkPosition();

  res.redirect(`/game/${req.params.id}`)
})
router.post('/:id/move/Left', async (req, res) =>{

if(Math.random() > 0.9) res.redirect(`/game/${req.params.id}/battle`);

 req.app.locals.currentPlayer.clearPosition();
 req.app.locals.currentPlayer.left();
 req.app.locals.currentPlayer.checkPosition();

  res.redirect(`/game/${req.params.id}`)
})
router.post('/:id/move/Right', async (req, res) =>{

if(Math.random() > 0.9) res.redirect(`/game/${req.params.id}/battle`);

 req.app.locals.currentPlayer.clearPosition();
 req.app.locals.currentPlayer.right();
 req.app.locals.currentPlayer.checkPosition();

  res.redirect(`/game/${req.params.id}`)
})

router.get('/:id/battle', async (req, res) => {

  req.app.locals.ogre = {oHp: req.app.locals.currentPlayer.lvl * 3,
                         oAttack: req.app.locals.currentPlayer.lvl };


  res.render('battle', {
    enemyHp: req.app.locals.ogre.oHp,
    enemyAtk: req.app.locals.ogre.oAttack,
    id: req.params.id
  });
})
router.post('/:id/attack', async (req, res) => {

req.app.locals.currentPlayer.hp -= req.app.locals.ogre.oAttack;

req.app.locals.ogre.oHp -= req.app.locals.currentPlayer.atk;

if(req.app.locals.ogre.oHp <= 0){
  req.app.locals.currentPlayer.gold += 3 + req.app.locals.currentPlayer.lvl;
  req.app.locals.currentPlayer.xp += 50;
  if(req.app.locals.currentPlayer.xp >= 100){
    req.app.locals.currentPlayer.xp = 0;
    req.app.locals.currentPlayer.lvl++;
    req.app.locals.currentPlayer.atk++;
    //req.app.locals.currentPlayer.hp += req.app.locals.currentPlayer.lvl * 10;
  }
  res.redirect(`/game/${req.params.id}`)
}

  res.render('battle', {
    enemyHp: req.app.locals.ogre.oHp,
    enemyAtk: req.app.locals.ogre.oAttack,
    id: req.params.id
  });
})

router.post('/:id/quit', async (req,res) =>{
  const id = req.app.locals.currentPlayer.userId;
  delete req.app.locals.currentPlayer
  res.redirect(`/user/${id}`)
})

router.put('/:id/save', async (req,res) =>{

  await Save.update({
    lvl: req.app.locals.currentPlayer.lvl,
    xp: req.app.locals.currentPlayer.xp,
    positionX: req.app.locals.currentPlayer.positionX,
    positionY: req.app.locals.currentPlayer.positionY,
    atk: req.app.locals.currentPlayer.atk,
    hp: req.app.locals.currentPlayer.hp,
    gold: req.app.locals.currentPlayer.gold
  },
  {where: {
    LoginId: req.app.locals.currentPlayer.userId,
    name: req.app.locals.currentPlayer.name
  }})


  res.redirect(`/game/${req.app.locals.currentPlayer.name}`)
})

module.exports = router;
