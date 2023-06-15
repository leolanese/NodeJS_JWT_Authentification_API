import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamp: true
}
);

userSchema.methods.matchPassword = async function (enterendPassword) {
    return await bcrypt.compare(enterendPassword, this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Model = mongoose.model('users', userSchema);

export default Model;