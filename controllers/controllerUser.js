const { User, Profile, Room, Status, Transaction } = require("../models");
const { Op } = require("sequelize");
const user = require("../models/user");
const admin = require("../routers/admin");
const bcryptjs = require("bcryptjs");
const Helper = require("../helpers/helper");

class ControllerUser {

  static async loginUser(req, res) {
    // login user
    try {
      res.render("loginFormUser");
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async loginUserProcess(req, res) {
    // post login user
    try {
      const { username, password } = req.body;
      let dataUser = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!dataUser) {
        res.redirect("/login?error=username invalid");
      }

      let user = bcryptjs.compareSync(password, data.password);
      if (user) {
        req.session.role = data.role;
        res.render("/users");
      } else {
        res.redirect("/login?error=username invalid");
      }
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async showAllRooms(req, res) {
    // menampilkan semua rooms
    try {
      const result = await Room.findAll({
        where: {
          StatusId: 2,
        },
        order: [["id", "ASC"]],
      });
      res.render("userPage", { result });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }

  static async bookRoom(req, res) {
    //booking atau beli
    try {
      const { id } = req.params;
      console.log(id, "id");

      const room = await Room.findOne({
        where: {
          id: id,
        },
      });

      if (!room) {
        return res.status(404).send("Room not found");
      }

      if (room.StatusId > 1) {
        await room.decrement("StatusId", { by: 1 });
      }

      res.redirect("/users");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async showProfile(req, res) {
    try {
      let result = await Profile.findAll();
      res.render("userProfile", { result });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ControllerUser;
