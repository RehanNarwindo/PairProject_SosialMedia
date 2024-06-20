async function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

// export default hashPass( async (password) => {
//     const salt = bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt)
//     return hashedPassword
// })