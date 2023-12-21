const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const Helper = require("../helpers/helper");

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
      console.log(req.body);
      const { email, password } = req.body;
      let data = await User.findOne({
        where: {
          email: email,
        },
      });  
      if (!data) {
        res.redirect("/login?/err=email invalid");
      }
      let user = bcryptjs.compareSync(password, data.password);
      if (user) {
        req.session.role = data.role;
        res.redirect("/admin");
      } else {
        res.redirect("/login?error=email invalid");
      }
    } catch (error) {
      res.send(error.message);
    }
  }

  static async adminPage(req, res) {
    try {
      // if(req.session.role==='2'){
      //   res.redirect('/users')
      // }else if
      // (req.session.role==='1'){
      //   res.redirect('/admin')
      // }else{
      //   res.redirect('/')
      // }
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
      res.render("adminPage", { result });
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
      res.send(error);
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
      console.log(`ini adalah session ${req.session.role}`);
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
