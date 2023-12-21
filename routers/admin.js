const express = require("express");
const ControllerAdmin = require("../controllers/controllerAdmin");
const admin = express.Router();

admin.get('/admin', ControllerAdmin.adminPage)
admin.get('/admin/login', ControllerAdmin.loginAdmin)
admin.post('/admin/login', ControllerAdmin.loginAdminPost)
admin.get('/admin/add', ControllerAdmin.roomAdd)
admin.post('/admin/add', ControllerAdmin.roomAddPost)
admin.get('/admin/:id/edit', ControllerAdmin.roomIdEdit)
admin.post('/admin/:id/edit', ControllerAdmin.roomIdEditPost)
admin.get('/admin/:id/delete', ControllerAdmin.delRoom)
admin.get('/logout', ControllerAdmin.logoutAdmin)



module.exports=admin