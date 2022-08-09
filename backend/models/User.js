const {Schema, model} = require('mongoose');

const {ObjectId} = Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        require: [true, 'first_name is required'],
        trim: true,
        text: true
    },
    last_name: {
        type: String,
        require: [true, 'first_name is required'],
        trim: true,
        text: true
    },
    username: {
        type: String,
        require: [true, 'first_name is required'],
        trim: true,
        text: true,
        unique: true
    },
    email: {
        type: String,
        require: [true, 'email is required'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, 'password is required'],
    },
    picture: {
        type: String,
        default: ''
    },
    cover: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        require: [true, 'password is required'],
        default: ''
    },
    bYear: {
        type: Number,
        require: true,
        trim: true
    },
    bMonth: {
        type: Number,
        require: true,
        trim: true
    },
    bDay: {
        type: Number,
        require: true,
        trim: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    friends: {
        type: Array,
        default: []
    },
    following: {
        type: Array,
        default: []
    },
    followers: {
        type: Array,
        default: []
    },
    requests: {
        type: Array,
        default: []
    },
    search: [
        {
            user: {
                type: ObjectId,
                ref: 'User'
            }
        }
    ],
    details: {
        bio: {
            type: String
        },
        otherName: {
            type: String
        },
        job: {
            type: String
        },
        workplace: {
            type: String
        },
        highSchool: {
            type: String
        },
        college: {
            type: String
        },
        currentCity: {
            type: String
        },
        homeTown: {
            type: String
        },
        relationship: {
            type: String,
            enum: ['Single', 'In a relationShip', ' Married', 'Divorced']
        },
        instagram: {
            type: String
        },
    },
    savedPosts: [
        {
            post: {
                type: ObjectId,
                ref: 'Post'
            },
            saveAt: {
                type: Date,
                default: new Date()
            }
        }
    ]
}, {
    timestamps: true
})

module.exports = (model('User', userSchema))
