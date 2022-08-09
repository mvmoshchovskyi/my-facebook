const User = require('../models/User')
exports.validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
}

exports.validateLength = (text, min, max) => {
    if (text.length < min || text.length > max) {
        return false
    }
    return true;
}

exports.validateUsername = async (username) => {
    let a = false
    do {
        let check = await User.findOne({username})
        if (check) {
            username += (+new Date() * Math.random().toString().substring(0, 1))
            a = true
        } else {
            a = false
        }
    }
    while (a)
    return username
}
