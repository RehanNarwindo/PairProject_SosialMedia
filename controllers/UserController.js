const {User} = require("../models/index")
class UserController{
    static async registerForm(req, res){
        try {
            res.render("register.ejs")
        } catch (error) {
            res.send(error)
        }
    }
    static async postRegister(req, res){
        try {
            let data = await User.findAll();
            console.log(data);
            console.log(req.body);
            // const {username, phone_number, email, password, role } = req.body;
            await User.create(req.body)
            // res.send(req.body)
            res.redirect("/login")
        } catch (error) {
            res.send(error.message)
        }
    }
}

module.exports = UserController;