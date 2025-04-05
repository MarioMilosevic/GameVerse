var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
    .$extends({
    name: "Protect password",
    query: {
        user: {
            create(_a) {
                return __awaiter(this, arguments, void 0, function* ({ args, query }) {
                    args.data["password"] = bcrypt.hashSync(args.data["password"], 12);
                    return query(args);
                });
            },
        },
    },
})
    .$extends({
    name: "Check passwords",
    model: {
        user: {
            checkPassword(candidatePassword, userPassword) {
                return __awaiter(this, void 0, void 0, function* () {
                    return yield bcrypt.compare(candidatePassword, userPassword);
                });
            },
        },
    },
});
export default prisma;
