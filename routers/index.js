const express = require('express');
const router = express.Router()
const user= require('./user');
const admin= require('./admin');
const Controller = require('../controllers/controller');

router.use(user)
router.use(admin)

router.get("/", (req, res) => {
    res.render("landingPage");
  });

  router.get("/login", (req, res) => {
    res.render("loginPage");
  });

  router.get("/register", (req, res) => {
    res.render("registForm");
  });

router.get('/admin/register', Controller.register)
router.get('/admin/register', Controller.registerPost)


module.exports = router