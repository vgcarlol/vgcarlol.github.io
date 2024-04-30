require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions'); // Asegúrate de tener este archivo configurado

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes'); // Importa las rutas de autenticación
const errorHandler = require('./middlewares/ErrorHandler');
const logRequests = require('./middlewares/logRequests');
const notFoundHandler = require('./middlewares/notFoundHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(logRequests); // Registra los detalles de cada solicitud

// Ruta de bienvenida o información
app.get('/', (req, res) => {
    res.status(200).json({
        message: "Bienvenido a la API del Blog",
        documentation: "http://localhost:3000/api-docs"
    });
});

// Ruta para la documentación de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/posts', postsRoutes);
app.use('/api', authRoutes); // Usa las rutas de autenticación

// Manejadores de errores
app.use(notFoundHandler); // Manejador de rutas no encontradas
app.use(errorHandler); // Manejador de errores global

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
