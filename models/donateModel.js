import mongoose from "mongoose"

const Schema = mongoose.Schema

const donateSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true //? baştaki ve sondaki boşluklardan kurtulmak icin
    },
    surname: {
        type: Schema.Types.String,
        required: true,
        trim: true //? baştaki ve sondaki boşluklardan kurtulmak icin
    },
    tel: {
        type: Schema.Types.Number,
        required: true,
    },
    tc: {
        type: Schema.Types.Number,
        required: true,
    },
    amount: {
        type: Schema.Types.Number,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    email: {
        type: Schema.Types.String,
        required: true,
        unique: true
    },
    photo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Photo"
    },
}, {
    minimize: true,//? boş kayıtları otomatik siler
    timestamps: false, //? Otomatik createdAT ve updatedAT oluşturur
    autoIndex: true //? şemayı otomatik oluşturur
})

const Donate = mongoose.model("Donate", donateSchema, "donate")

export default Donate