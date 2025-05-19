/**
 * API client for making requests to the backend
 */

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiRequestOptions {
  method?: RequestMethod;
  body?: any;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

const defaultOptions: ApiRequestOptions = {
  method: 'GET',
  requiresAuth: false,
};

/**
 * Custom error class for API errors with more context
 */
export class ApiError extends Error {
  status: number;
  url: string;
  method: string;
  data: any;

  constructor(message: string, response: Response, method: string, data: any = {}) {
    super(message);
    this.name = 'ApiError';
    this.status = response.status;
    this.url = response.url || '';
    this.method = method;
    this.data = data;
    
    // Maintain proper stack trace for where our error was thrown (Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toString() {
    return `${this.name}: [${this.status}] ${this.message} (${this.method} ${this.url})`;
  }
}

/**
 * Make an API request
 */
export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = defaultOptions
): Promise<T> {
  const { method = 'GET', body, requiresAuth = false } = options;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if required
  if (requiresAuth) {
    // Try to get token from Clerk if available, fallback to localStorage for backward compatibility
    let token = null;
    if (typeof window !== 'undefined') {
      try {
        // Using dynamic import to avoid SSR issue [CCFA-14]s
        console.log('[API] Getting Clerk token for authenticated request to:', endpoint);
        const { getToken } = await import('@clerk/nextjs');
        token = await getToken();
        console.log('[API] Clerk token obtained:', !!token);
      } catch (e) {
        console.warn('Could not get Clerk token, falling back to localStorage:', e);
        token = localStorage.getItem('auth_token');
      }
    }
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('No auth token available for request that requires authentication');
    }
  }

  const config: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(`/api/${endpoint}`, config);
    
    // Handle non-2xx responses
    if (!response.ok) {
      const handleError = async (response: Response) => {
        let errorData = { message: 'Unknown error' }; 
        
        if (response.status === 401) {
          console.error('Authentication error - 401 Unauthorized', {
            endpoint,
            requiresAuth,
          });
          if (requiresAuth) {
            errorData.message = 'You need to be logged in to perform this action';
          }
        }
        
        try {
          // Try to parse error response as JSON
          errorData = await response.json();
        } catch (e) {
          // If parsing fails, log the error and continue with default message
          console.warn('Could not parse error response as JSON', e);
        }
        
        // Create a more detailed error message
        const errorMessage = errorData.message || `API error: ${response.status} (${response.statusText})`;
        
        // Log more context for debugging
        console.error(`API Error [${response.status}]:`, {
          endpoint,
          method,
          errorMessage,
          errorData,
          originalResponse: response,
        });
        
        // Throw a custom error with additional context
        throw new ApiError(errorMessage, response, method, errorData);
      };
      
      await handleError(response);
    }
    
    // Parse JSON response
    const data = await response.json();
    return data as T;
  } catch (error) {
    // If it's already our custom ApiError, just rethrow it
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Otherwise wrap in a more helpful error message
    console.error(`API request failed: ${endpoint}`, error);
    throw new Error(
      error instanceof Error 
        ? `API request failed: ${error.message}` 
        : 'Unknown error occurred during API request'
    );
  }
}

/**
 * Auth-related API functions
 */
export const auth = {
  login: async (email: string, password: string) => {
    return apiRequest('auth', {
      method: 'POST',
      body: { email, password },
    });
  },
  
  register: async (username: string, email: string, password: string) => {
    return apiRequest('users', {
      method: 'POST',
      body: { username, email, password },
    });
  },
  
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  },
  
  saveToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  },
  
  getUserByClerkId: async (clerkId: string) => {
    return apiRequest(`users/by-clerk/${clerkId}`);
  },
  
  createUserFromClerk: async (user: { id: string; username?: string; email?: string; avatar?: string }) => {
    return apiRequest('users/from-clerk', {
      method: 'POST',
      body: user,
    });
  },
};

/**
 * Category-related API functions
 */
export const categories = {
  getAll: async () => {
    return apiRequest('categories');
  },
  
  getById: async (id: string) => {
    return apiRequest(`categories/${id}`);
  },
};

/**
 * Thread-related API functions
 */
export const threads = {
  getAll: async (categoryId?: string) => {
    const endpoint = categoryId ? `threads?category=${categoryId}` : 'threads';
    return apiRequest(endpoint);
  },
  
  getById: async (id: string) => {
    return apiRequest(`threads/${id}`);
  },
  
  getTrending: async (limit: number = 5) => {
    return apiRequest(`threads/trending?limit=${limit}`);
  },
  
  create: async (data: { title: string; content: string; category: string; tags?: string[] }) => {
    return apiRequest('threads', {
      method: 'POST',
      body: data,
      requiresAuth: true,
    });
  },
};

/**
 * Post-related API functions
 */
export const posts = {
  getByThread: async (threadId: string) => {
    return apiRequest(`posts?thread=${threadId}`);
  },
  
  create: async (data: { content: string; thread: string; parentPost?: string }) => {
    return apiRequest('posts', {
      method: 'POST',
      body: data,
      requiresAuth: true,
    });
  },
};

/**
 * User-related API functions
 */
export const users = {
  getProfile: async (id: string) => {
    return apiRequest(`users/${id}`);
  },
};
