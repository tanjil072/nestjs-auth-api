"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcryptjs"));
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    users = [
        {
            id: 'admin-id',
            email: 'admin@example.com',
            password: '$2a$10$somehashedadminpass1234567890abcdef',
            name: 'Admin',
            role: 'admin',
        },
    ];
    refreshTokens = {};
    async findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
    async findById(id) {
        return this.users.find((user) => user.id === id);
    }
    async create(userData) {
        const existing = await this.findByEmail(userData.email);
        if (existing) {
            throw new common_1.ConflictException('Email already exists');
        }
        const id = (0, uuid_1.v4)();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const role = userData.role || 'user';
        const user = { id, ...userData, password: hashedPassword, role };
        this.users.push(user);
        return user;
    }
    async validateRefreshToken(token) {
        const tokenHash = await bcrypt.hash(token, 10);
        return this.refreshTokens[tokenHash] || null;
    }
    async storeRefreshToken(token, userId) {
        const tokenHash = await bcrypt.hash(token, 10);
        delete this.refreshTokens[tokenHash];
        this.refreshTokens[tokenHash] = userId;
    }
    async invalidateRefreshToken(token) {
        const tokenHash = await bcrypt.hash(token, 10);
        delete this.refreshTokens[tokenHash];
    }
    getRefreshTokens() {
        return this.refreshTokens;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)()
], UsersService);
//# sourceMappingURL=users.service.js.map