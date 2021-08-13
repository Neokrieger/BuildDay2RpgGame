const express = require('express');
const router = express.Router({ mergeParams: true });
const { Login } = require(`../models`);
const bcrypt = require('bcryptjs');

router.get('/', (req, res) => {
	res.render('login', {
		error : res.locals.errors[0]
	});
});

router.post('/error', async (req, res) => {
	const user = await Login.findOne({
		where : {
			username : req.body.username
		}
	});

	if (user && bcrypt.compareSync(req.body.password, user.password)) {
		req.session.userId = user.id
		res.redirect(`/user/${req.session.userId}`);
	} else {
		res.render(`login`, {
			error : res.locals.errors[1]
		});
	}
});

module.exports = router;
