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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const zod_1 = require("zod");
const db_1 = require("./db");
exports.app.use(express_1.default.json());
const inputSchem = zod_1.z.object({
    a: zod_1.z.number(),
    b: zod_1.z.number(),
});
exports.app.post('/sum', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const validation = inputSchem.safeParse(req.body);
        if (!validation.success) {
            return res.status(422).json({
                msg: "User Inter inCorrect Input"
            });
        }
        //  try {
        const calciData = yield db_1.prismaClient.calculation.create({
            data: {
                a: validation.data.a,
                b: validation.data.a,
                answer: validation.data.a + validation.data.b,
                type: "sum"
            }
        });
        return res.status(200).json({
            answer: calciData.answer,
            id: calciData.id
        });
        //  }catch(err) {
        //     console.log(err);
        //     return res.status(404).json({
        //         msg : "there are some problems in the database",
        //     })
        //  }
    });
});
