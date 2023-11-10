const authMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/auth/login')
}

export default authMiddleware;