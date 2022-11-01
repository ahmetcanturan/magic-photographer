import iyzipay from "./iyzipay.js"

//? Ödemeyi Başlatan Method
const initialize = async (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutFormInitialize.create(data, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

//? Ödemeyi Tamamlayan Method
const getFormPayment = async (data) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutForm.retrieve(data, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}

export { initialize, getFormPayment }