import md5 from "md5"

const hashToPassword = (password) => {
    return md5(password)
}


export { hashToPassword }