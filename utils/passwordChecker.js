
function passwordChecker (value) {
    // Password validation using regular expression
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/.test(value);
}

module.exports = passwordChecker;