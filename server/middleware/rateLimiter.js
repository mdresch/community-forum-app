class ServerRateLimiter {
  constructor(maxRequests = 100, windowMs = 900000) { // 100 requests per 15 minutes
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.clients = new Map();
    
    // Clean up old entries every 5 minutes
    setInterval(() => this.cleanup(), 300000);
  }

  cleanup() {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    for (const [clientId, requests] of this.clients.entries()) {
      const validRequests = requests.filter(time => time > windowStart);
      if (validRequests.length === 0) {
        this.clients.delete(clientId);
      } else {
        this.clients.set(clientId, validRequests);
      }
    }
  }

  middleware() {
    return (req, res, next) => {
      const clientId = req.ip || req.connection.remoteAddress;
      const now = Date.now();
      const windowStart = now - this.windowMs;

      if (!this.clients.has(clientId)) {
        this.clients.set(clientId, []);
      }

      const clientRequests = this.clients.get(clientId);
      const validRequests = clientRequests.filter(time => time > windowStart);
      this.clients.set(clientId, validRequests);

      if (validRequests.length >= this.maxRequests) {
        return res.status(429).json({
          error: 'Too Many Requests',
          retryAfter: Math.ceil(this.windowMs / 1000),
          limit: this.maxRequests,
          window: this.windowMs
        });
      }

      validRequests.push(now);
      this.clients.set(clientId, validRequests);
      
      // Add rate limit headers
      res.set({
        'X-RateLimit-Limit': this.maxRequests,
        'X-RateLimit-Remaining': this.maxRequests - validRequests.length,
        'X-RateLimit-Reset': new Date(now + this.windowMs).toISOString()
      });
      
      next();
    };
  }
}

module.exports = ServerRateLimiter;