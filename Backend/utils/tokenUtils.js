const jwt = require("jsonwebtoken");

exports.generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
    res.cookie("jwt", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
    });
};

exports.validate = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(401).json({ message: "token not sent" });
    }
    if (token.expiresIn < Date.now()) {
        return res.status(401).json({ message: "Token already expired" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.userId = decoded.userId;
        next();
    });
}