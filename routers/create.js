const express = require('express')
const router = express.Router( { mergeParams: true } )
const { Save } = require('../models');
const Player = require('../Player');

router.get('/:id', (req, res) =>{
  res.render('create', {
    id: req.session.userId,
    text: ""
  });
})

router.post('/:id', async (req,res) => {
   res.locals.player = new Player(req.body.name, req.session.userId)

   const newChar = await Save.create({
     LoginId: res.locals.player.userId,
     name: res.locals.player.name,
     lvl: res.locals.player.lvl,
     xp: res.locals.player.xp,
     positionX: res.locals.player.positionX,
     positionY: res.locals.player.positionY,
     atk: res.locals.player.atk,
     hp: res.locals.player.hp,
     gold: res.locals.player.gold,
   })


   res.redirect(`/user/${req.params.id}`)
})

module.exports = router;
