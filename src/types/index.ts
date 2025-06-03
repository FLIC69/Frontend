export interface User {
  username: string;
  isAuthenticated: boolean;
}

export interface ParameterValues {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

export interface Crop {
  id: string;
  name: string;
  image: string;
  description: string;
}