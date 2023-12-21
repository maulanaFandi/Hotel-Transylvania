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
          username: username,
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
      // console.log("masuk");
      const result = await Room.findAll({
        where: {
          StatusId: 2,
        },
        order: [["id", "ASC"]],
      });
      // console.log(result);
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
      //   console.log(room);
      //   console.log(id, "<<<");
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
      let data = await Profile.findAll();
      let dataProfile = await User.create({
        username: req.body.username,
        password: req.body.password,
        role: req.body.role,
      });

      await Profile.create({
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        UserProfileId: user.dataValues.id,
      });

      res.render("profile", { data, dataProfile });
    } catch (error) {
      console.log(error);
      res.send(error);
    }
  }
}

module.exports = ControllerUser;
