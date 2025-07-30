import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    // per user (or on ip address)
    try {
        const {success} = await ratelimit.limit("my-limit-key")// instead of my-limit-key use user id for that user, right now no authentication so no user 

        if(!success) {
            return res.status(429).json({message : "Too many request, please try again later."})
        }

        next();
    }
    catch(e) {
        console.log("Rate Limit Error", e);
        next(e)
    }
}

export default rateLimiter;