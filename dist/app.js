"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cors_1 = __importDefault(require("cors"));
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(express_1.default.json());
// Ruta raíz
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenido a la API',
        endpoints: {
            users: '/users',
            auth: '/api/auth'
        }
    });
});
// Rutas
app.use('/users', userRoutes_1.default);
