import RateLimiter from '../utils/ratelimiter.js';

class ApiService {
  constructor() {
    this.monitoringLimiter = new RateLimiter(5, 60000); // 5 requests per minute for monitoring
    this.generalLimiter = new RateLimiter(30, 60000); // 30 requests per minute for general API calls
    this.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:3000';
  }

  async monitoringRequest(params) {
    const key = 'monitoring';
    
    if (!this.monitoringLimiter.canMakeRequest(key)) {
      throw new Error('Too many monitoring requests. Please wait before trying again.');
    }

    try {
      this.monitoringLimiter.addRequest(key);
      const response = await fetch(`${this.baseURL}/monitoring?${new URLSearchParams(params)}`);
      
      if (response.status === 429) {
        console.warn('Server rate limit hit. Backing off...');
        throw new Error('Rate limited by server');
      }
      
      return response.json();
    } catch (error) {
      console.error('Monitoring request failed:', error);
      throw error;
    }
  }

  async generalRequest(endpoint, options = {}) {
    const key = 'general';
    
    if (!this.generalLimiter.canMakeRequest(key)) {
      throw new Error('Too many requests. Please wait before trying again.');
    }

    try {
      this.generalLimiter.addRequest(key);
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After') || '60';
        throw new Error(`Rate limited. Retry after ${retryAfter} seconds.`);
      }
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
}

export default new ApiService();