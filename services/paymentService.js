import * as Checkouts from "../iyzico/checkouts.js"
import { nanoid, logFile } from "../utils/utils.js"
import Iyzipay from "iyzipay"
import moment from "moment"
moment.locale("tr")


const initializeCheckoutForm = async (donate, ip) => {
    return await Checkouts.initialize({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        price: donate.amount,
        paidPrice: donate.amount,
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: String(donate._id),
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "https://magic-photographer.herokuapp.com/check-in-payment",
        enabledInstallments: [1],//? Taksit seçeneklerini biz giriyoruz
        buyer: { //? Kullanıcının veritabanımızdaki bilgilerini giriyoruz
            id: nanoid(),
            name: donate.name,
            surname: donate.surname,
            gsmNumber: `+90${donate.tel}`,
            email: donate.email,
            identityNumber: donate.tc, //? Kullanıcının TC kimlik numarası
            lastLoginDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            registrationDate: `${moment().format('YYYY-MM-DD HH:mm:ss')}`,
            registrationAddress: "virtual address",
            ip: ip,
            city: "virtual address",
            country: "Turkey",
            zipCode: "16000"
        },
        shippingAddress: {
            contactName: "MagicPhotographer",
            city: "virtual address",
            country: "Turkey",
            address: "virtual address",
            zipcode: "34732",
        },
        billingAddress: {//? Fatura Adresi
            contactName: "MagicPhotographer",
            city: "virtual address",
            country: "Turkey",
            address: "virtual address",
            zipcode: "34732",
        },
        basketItems: [
            {
                id: String(donate.photo),
                name: "Photo",
                category1: "Donate",
                category2: "Donate",
                itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
                price: donate.amount
            }
        ]
    }).then((result) => {
        // console.log(result)
        logFile("payment", result)
        if (result?.status != "success") { return { status: false, token: result.token } }
        return { url: result.paymentPageUrl, token: result.token }
    }).catch((err) => {
        console.log(err)
        logFile("payment_error", err)
        return { status: false }
    })
}

const getFormPayment = async (token) => {
    return await Checkouts.getFormPayment({
        locale: Iyzipay.LOCALE.TR,
        conversationId: nanoid(),
        token: token
    }).then((result) => {
        // console.log(result)
        logFile("payments-complete", result)
        return result
    }).catch((err) => {
        console.log(err)
        logFile("payments-complete-error", err)
        return err
    })
}

export { initializeCheckoutForm, getFormPayment }