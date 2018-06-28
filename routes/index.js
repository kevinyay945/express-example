var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', async function(req, res) {
  let users = await models.User.findAll({
    include: [models.Task]
  });

  res.render('index', {
    title: 'Sequelize: Express Example',
    users: users
  });

});

module.exports = router;
