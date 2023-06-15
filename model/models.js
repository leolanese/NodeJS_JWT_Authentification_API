import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

// Define User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        trim: true,
        maxLength: [50, 'Name cannot be more than 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minLength: [6, 'Password cannot be less than 6 characters'],
        select: false // This prevents the password from being returned in a query
    }
}, {
    timestamps: true
});

userSchema.methods.matchPassword = async function (enterendPassword) {
    return await bcrypt.compare(enterendPassword, this.password);
}

userSchema.pre('save', async function(next){
    if (!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Model = mongoose.model('users', userSchema);

export default Model;