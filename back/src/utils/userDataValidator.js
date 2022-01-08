module.exports = async function(User, { firstname, lastname, email, password, pin }) {
    const checkEmailAvailability = await User.count({ where: { email: email } });
    const namesRegex = /(?!^\s$)/;
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    const passwordRegex = /^(?=\w*\d)(?=\w*[a-z])\S{6,20}$/;
    const pinRegex = /^\d{6}$/;

    return (
        checkEmailAvailability === 0 &&
        namesRegex.test(firstname) &&
        namesRegex.test(lastname) &&
        emailRegex.test(email) &&
        passwordRegex.test(password) &&
        pinRegex.test(pin)
    );
}
