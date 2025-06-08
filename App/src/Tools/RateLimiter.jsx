const RATE_LIMIT = 50;
const WINDOW_MS = 60 * 1000;
let requestTimestamps = [];

export const canRequest = () => {
    const now = Date.now();
    requestTimestamps = requestTimestamps.filter(ts => now - ts < WINDOW_MS);
    if (requestTimestamps.length >= RATE_LIMIT) 
    {
        return false;
    }
    requestTimestamps.push(now);
    return true;
}


