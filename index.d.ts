type Fetchival = {
  get(queryParams?: {}): Promise<any>;
  post(data?: any): Promise<any>;
  put(data?: any): Promise<any>;
  patch(data?: any): Promise<any>;
  delete(): Promise<any>;
};

export default function fetchival(
  url: string,
  opts?: {
    headers?: {
      Accept?: string;
      'Content-Type'?: string;
    };
    responseAs?: 'json' | 'text' | 'response';
  },
): Fetchival;
