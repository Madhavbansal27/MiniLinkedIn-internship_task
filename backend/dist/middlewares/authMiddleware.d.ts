import type { Request, Response, NextFunction } from "express";
interface authenticateRequest extends Request {
    userId?: string;
}
declare const authMiddleware: (req: authenticateRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map