const rateLimit = (() => {
    const timeOfReq = new Map();
    const rateLimit = 100; // Max requests
    const timeWindow = 60 * 1000; // 1 minute

    return (req, res, next) => {
        const currentTime = Date.now();
        const userIp = req.ip;

        if (!timeOfReq.has(userIp)) {
            timeOfReq.set(userIp, []);
        }

        const timestamps = timeOfReq.get(userIp).filter(timestamp => currentTime - timestamp < timeWindow);

        if (timestamps.length >= rateLimit) {
            return res.status(429).json({
                message: "Rate limit exceeded. Please try again later.",
                success: false,
            });
        }

        timestamps.push(currentTime);
        timeOfReq.set(userIp, timestamps);
        next();
    };
})();
export default rateLimit;