const bcrypt = require('bcryptjs');

async function generateHash(password) {
    const saltRounds = 10;  // 10 es el número recomendado de rondas de sal
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        console.log("Hashed Password:", hash);
        return hash;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
}

// Cambia 'your_password_here' por la contraseña que deseas hashear
generateHash('your_password_here');
