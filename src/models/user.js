const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Should Have a Name!'],
        unique: false
    },
    email: {
        type: String,
        required: [true, 'email should be provided'],
        unique: true,
        // Sanitize part
        trim: true,
        validate: {
            validator: (v) => validator.isEmail(v),
            message: (props) => `${props.value} is not a valid email address!`
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        validate: {
            validator: (v) => (v.length > 6 && !(v.toLowerCase().includes('password'))),
            message: (props) => `${props.value} is not a valid password!`
        }
    },
    age: {
        type: Number,
        // bunu yine de görmedi (undefined), AMA (null) olarak default value verebildik.
        default: null,
        //Custom Validator
        validate: {
            validator: (value) => {
                if (value) {
                    return (value > 0)
                } else {
                    return true
                }
            },
            message: (props) => `${props.value} is not a valid age!`
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'Gurkan-Tasks-App')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

//Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        // @ts-ignore
        user.password = await bcrypt.hash(user.password, 8)
        // @ts-ignore
        console.log(user.password)
    }
    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({
        owner: user._id
    })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User