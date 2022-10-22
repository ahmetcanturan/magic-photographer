const hashToPassword = (password) => {
    const md5 = import("md5")
    return md5(password)
}
