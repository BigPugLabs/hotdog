

module.exports = {
    getHotdogs: async (req, res) => {
        try {
            res.render("hotdog", { user: req.user.userName })
        } catch (err) {
            console.error(err)
        }
    }
}