const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const rupiah = require("../helpers/helper");

class ControllerAdmin {

  static async loginAdmin(req, res) {
    try {
      res.render("loginFormAdmin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async loginAdminPost(req, res) {
    try {
      const { username, password } = req.body;
      let data = await User.findOne({
        where: {
          username: username,
        },
      });
      if (!data) {
        res.redirect("/login?/err=username invalid");
      }
      let user = bcryptjs.compareSync(password, data.password);
      if (user) {
        req.session.role = data.role;
        res.redirect("/admin");
      } else {
        res.redirect("/login?error=username invalid");
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  static async adminPage(req, res) {
    try {
      let {search} = req.query
      let where = {};
      
      if (search) {
        where = {
            name: { [Op.iLike]: `%${search}%` }
        };
      }

      let result = await Room.findAll({
        order: [
            ['roomNumber', 'ASC'],
        ]
      });
      res.render("adminPage", { result, rupiah });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomAdd(req, res) {
    // room id
    try {
        res.render("addRoom")
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomAddPost(req, res) {
    try {
        await Room.create({
            roomNumber: req.body.roomNumber,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            roomType: req.body.roomType,
            StatusId: req.body.StatusId
        })
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomIdEdit(req, res) {
    // room i edit
    try {
      const { id } = req.params;
      let result = await Room.findOne({
        where: {
          id
        },
      });
      res.render("editRoom", { result });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async roomIdEditPost(req, res) {
    // room i edit post
    try {
      const { id } = req.params;
        await Room.update({
            roomNumber: req.body.roomNumber,
            price: req.body.price,
            imgUrl: req.body.imgUrl,
            roomType: req.body.roomType,
        },{where: {id}})
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async delRoom(req, res) {
    //delete
    try {
      const { id } = req.params;
      const data = await Room.destroy({ where: { id } });
      res.redirect("/admin");
    } catch (error) {
      res.send(error.message);
    }
  }

  static async logoutAdmin(req, res){
    try {
        req.session.destroy((err) => {
            if (err){
                console.log(err)
            } else {
                res.redirect("/")
            }
        })
    } catch (error) {
        
    }
}
}

module.exports = ControllerAdmin;
