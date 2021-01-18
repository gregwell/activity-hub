import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age: {
        type: Number,
        default: 0
    },
});

const User = mongoose.model('User', userSchema);

export default User;