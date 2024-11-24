"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const githubAuthMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).json({ error: "NO authorization header provided" });
    const bearerToken = authHeader.split(" ");
    if (bearerToken.length !== 2)
        return res.status(401).json({ error: "Invalid token format" });
    const token = bearerToken[1];
    try {
        const response = await fetch("http://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        if (!response.ok)
            return res.status(401).json({ error: "Invalid Github token" });
        const githubUser = await response.json();
        const internalUserId = `user_${githubUser.id}`;
        req.userID = internalUserId;
        req.githubUser = githubUser;
        next();
    }
    catch (error) {
        console.log("ERROR WITH GITHUB AUTH", error);
    }
};
exports.default = githubAuthMiddleware;
//# sourceMappingURL=githubAuth.js.map