const guestOnly = function (req, res, next) {
    if (req.session.userId) {
        if(req.session.role === 1){
            res.redirect(`/admin`)
        }else{
            res.redirect(`/users`)
        }
    } else {
        next()
    }
}

const isLoggedIn = function (req, res, next) {
    if (!req.session.userId) {
        res.redirect(`/login?errors=Please login first!`)
    } else {
        next()
    }
}

const isAdmin = function (req, res, next) {
    let role = Number(req.session.role);
    if (req.session.userId && role !== 1) {
        res.redirect(`/login?errors=You have no access`)
    } else {
        next()
    }
}


const isCustomer = function (req, res, next) {
    let role = Number(req.session.role);
    if (req.session.userId && role !== 2) {
        res.redirect(`/login?errors=You have no access`)
    } else {
        next()
    }
}


module.exports = {isLoggedIn,isAdmin, guestOnly, isCustomer}

