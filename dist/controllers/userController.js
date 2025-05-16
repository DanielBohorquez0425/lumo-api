"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getCurrentUser = exports.getUsers = void 0;
const app_1 = require("../app");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield app_1.prisma.user.findMany({
            include: { company: true },
        });
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});
exports.getUsers = getUsers;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'Usuario no autenticado' });
            return;
        }
        const _a = req.user, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
        res.json(userWithoutPassword);
    }
    catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
});
exports.getCurrentUser = getCurrentUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, companyId } = req.body;
    try {
        const user = yield app_1.prisma.user.create({
            data: { name, email, password, companyId },
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});
exports.createUser = createUser;
