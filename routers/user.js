const express = require('express')
const router = express.Router( { mergeParams: true } )
const { Login, Save } = require('../models');

const authenticator = (req, res, next) => {
  if (!req.session.userId) {
    res.render('login', {
  		error : res.locals.errors[2]
  	});
  } else {
    next()
  }
}

router.get('/', (req, res) => {
    res.render('user');
});

router.get(`/:id`,authenticator, async (req, res) => {

  const user = await Login.findOne({
		where : {
			id : req.params.id
		}
	});

  const chars = await Save.findAll({
    where: {
      LoginId: req.params.id
    }
  })

	res.render('user', {
    profile: user.username,
    id: user.id,
    chars: chars
  });
})

router.post(`/`, (req,res) => {
  delete req.session.userId;
  res.redirect('/login');
})

module.exports = router;
