import mongoose from "mongoose"

const Schema = mongoose.Schema

const photoSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
        trim: true //? baştaki ve sondaki boşluklardan kurtulmak icin
    },
    description: {
        type: Schema.Types.String,
        required: true,
        trim: true
    },
    uploadedAt: {
        type: Schema.Types.String,
        require: true,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    image: {
        type: Schema.Types.String,
        require: true
    },
    cloudinaryId: {
        type: Schema.Types.String,
        require: true
    }
}, {
    minimize: true,//? boş kayıtları otomatik siler
    timestamps: false, //? Otomatik createdAT ve updatedAT oluşturur
    autoIndex: true //? şemayı otomatik oluşturur
})

const Photo = mongoose.model("Photo", photoSchema, "photo")

export default Photo