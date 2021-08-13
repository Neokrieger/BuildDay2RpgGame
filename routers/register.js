const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router({ mergeParams: true });
const { Login } = require('../models');

router.get('/', (req, res) => {
	res.render('register', {
    error: ""
  });
});

router.post('/new', async (req, res) => {

  if(req.body.username != "" && req.body.password != ""){

	   const user = await Login.create({
		     username : req.body.username,
		     password : bcrypt.hashSync(req.body.password)
	        });
req.session.userId = user.id

	res.redirect(`/user/${req.session.userId}`);
}
else{
  res.render('register', {
    error: "Please enter valid details"
  });
}
});

module.exports = router;
