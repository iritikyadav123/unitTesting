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
const vitest_1 = require("vitest");
const supertest_1 = __importDefault(require("supertest"));
const __1 = require("..");
const db_1 = require("../__mocks__/db");
(0, vitest_1.describe)("calculations of numbers", () => {
    (0, vitest_1.describe)('POST, /sum', () => {
        (0, vitest_1.it)('sum of 5,8 is 13', () => __awaiter(void 0, void 0, void 0, function* () {
            db_1.prismaClient.calculation.create.mockResolvedValue({
                id: 1,
                a: 5,
                b: 8,
                answer: 13,
                type: "sum"
            });
            const res = yield (0, supertest_1.default)(__1.app).post('/sum').send({
                a: 5,
                b: 8
            });
            vitest_1.vi.spyOn(db_1.prismaClient.calculation, "create");
            (0, vitest_1.expect)(db_1.prismaClient.calculation.create).toHaveBeenCalledWith({
                data: {
                    a: 5,
                    b: 8,
                    answer: 13,
                    type: "sum"
                }
            });
            (0, vitest_1.expect)(res.statusCode).toBe(200);
            (0, vitest_1.expect)(res.body.answer).toBe(13);
        }));
    });
});
