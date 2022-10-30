import User from "../models/userModel.js"


const donationIncome = async (amount, userId) => {
    const usersEarning = (amount * 8) / 10 //* 20% site fee
    await User.findByIdAndUpdate(userId, {
        $inc: { donation: usersEarning }
    })
    return
}

export { donationIncome }