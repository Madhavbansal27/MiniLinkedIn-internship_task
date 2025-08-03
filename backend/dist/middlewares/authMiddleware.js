import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("JWT_SECRET not set in environment variables");
}
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(403).json({
            message: "token not sent"
        });
    }
    const actualToken = token.slice(7);
    try {
        const decoded = jwt.verify(actualToken, JWT_SECRET);
        if (typeof decoded === "string") {
            throw new Error("Invalid token payload");
        }
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(403).json({
            error
        });
    }
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map