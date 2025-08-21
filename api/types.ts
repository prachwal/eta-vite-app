// API Response Types
export interface ApiErrorObject {
  code: string;
  message: string;
  details?: any;
}

export interface ApiResponse<T = any> {
  status: boolean;
  payload?: T;
  error?: ApiErrorObject;
  metadata?: {
    timestamp: string;
    requestId?: string;
    [key: string]: any;
  };
}

// Utility functions for creating standardized responses
export const createSuccessResponse = <T>(
  payload: T,
  metadata?: Partial<ApiResponse<T>["metadata"]>
): ApiResponse<T> => ({
  status: true,
  payload,
  metadata: {
    timestamp: new Date().toISOString(),
    ...metadata,
  },
});

export const createErrorResponse = (
  error: ApiErrorObject,
  metadata?: Partial<ApiResponse["metadata"]>
): ApiResponse => ({
  status: false,
  error,
  metadata: {
    timestamp: new Date().toISOString(),
    ...metadata,
  },
});
