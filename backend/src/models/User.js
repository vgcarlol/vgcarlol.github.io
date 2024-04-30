const bcrypt = require('bcryptjs');
const pool = require('../utils/db');

const getUserByUsername = async (username) => {
    // Asegúrate de recuperar también el campo de la contraseña hasheada
    const { rows } = await pool.query('SELECT username, password_hash FROM admins WHERE username = $1', [username]);
    if (rows.length === 0) {
        console.log("No user found for username:", username);
        return null;
    }
    console.log("User found:", rows[0]);
    return rows[0];
};

const validatePassword = async (username, password) => {
    const user = await getUserByUsername(username);
    if (!user) {
        console.log("No user object returned");
        return false;
    }
    if (!user.password_hash) {
        console.log("No password_hash field available in user object");
        return false;
    }
    console.log("Comparando contraseña", password, "con hash", user.password_hash);
    const isMatch = await bcrypt.compare(password, user.password_hash);
    console.log("Resultado de la comparación:", isMatch);
    return isMatch;
};

module.exports = {
    getUserByUsername,
    validatePassword
};
