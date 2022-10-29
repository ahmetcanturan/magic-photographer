//? Check Out Formu ile Ödeme Sistemi
//? Bu sistemde iyzico kendi ödeme ekranlarını verir 
//? Kullanıcı isterse normal öder isterse 3D Secure ile öder
//? Modül içerisine cardUserKeyi tanımlarsak
//? Kullanıcının kayıtlı kartları form üzerinde kullanıcıya gösterilir.
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