"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.NODE_ENV = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
_a = process.env, exports.NODE_ENV = _a.NODE_ENV, exports.JWT_SECRET = _a.JWT_SECRET;
