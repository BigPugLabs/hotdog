

module.exports = {
    getHotdogs: async (req, res) => {
        console.log(req.user)
        try {
            res.render("hotdog", { user: req.user.userName })
        } catch (err) {
            console.error(err)
        }
    }
}