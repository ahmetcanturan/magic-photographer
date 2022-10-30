import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    password: {
        type: Schema.Types.String,
        require: true
    },
    donation: {
        type: Schema.Types.Number,
        default: 0
    }
}, {
    minimize: true,//? boş kayıtları otomatik siler
    timestamps: true, //? Otomatik createdAT ve updatedAT oluşturur
    autoIndex: true //? şemayı otomatik oluşturur
})

const User = mongoose.model("User", userSchema, "user")

export default User