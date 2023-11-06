import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';

// Define the type for the config object
type ApiConfig = AxiosRequestConfig & {
  abort?: (cancel: () => void) => void;
};

// Default config for the axios instance
const axiosParams = {
  // Set different base URL based on the environment or use environment variable
  baseURL: "",
};

// Create axios instance with default params
const axiosInstance = axios.create(axiosParams);

const didAbort = (error: any) => axios.isCancel(error);

const getCancelSource = () => axios.CancelToken.source();

const withAbort = (fn: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    const originalConfig = args[args.length - 1];
    // Extract abort property from the config
    let { abort, ...config } = originalConfig as ApiConfig;

    // Create cancel token and abort method only if abort
    // function was passed
    if (typeof abort === 'function') {
      const { cancel, token } = getCancelSource();
      config.cancelToken = token;
      abort(cancel);
    }

    try {
      // Pass all arguments from args besides the config
      console.log("Trying API call", ...args.slice(0, args.length - 1));
      return await fn(...args.slice(0, args.length - 1), config);
    } catch (error: any) {
      // Add "aborted" property to the error if the request was cancelled
      didAbort(error) && (error.aborted = true);
      throw error;
    }
  };
};

// Main api function
const api = (axios: AxiosInstance) => {
  
  return {
    get: (url: string, config: ApiConfig = {}) => withAbort(axios.get)(url, config),
    post: (url: string, body: any, config: ApiConfig = {}) => withAbort(axios.post)(url, body, config),
    patch: (url: string, body: any, config: ApiConfig = {}) => withAbort(axios.patch)(url, body, config),
    delete: (url: string, config: ApiConfig = {}) => withAbort(axios.delete)(url, config),
  };
};

export default api(axiosInstance);