const { Post, User } = require('../models/index')
class Controller {
    static async showPosts(req, res) {
        try {
            let data = await Post.findAll()
            
            res.render('./Dashboard/index_admin', {data})
        } catch (error) {
            res.send(error)
            console.log(error);
        }
    }
}

module.exports = Controller