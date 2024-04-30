const jwt = require('jsonwebtoken');
const { getUserByUsername, validatePassword } = require('../models/User');

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isMatch = await validatePassword(username, password);
        if (!isMatch) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Autenticación exitosa", token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Error del servidor: " + error.message });
    }
};


module.exports = {
    login
};
