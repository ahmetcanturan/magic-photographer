import mongoose from "mongoose"

const connect = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "magic_photographer",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log("Mongodb is Connected..")
        })
        .catch((err) => {
            console.log("DB connection err: ", err)
        })
}
export default connect