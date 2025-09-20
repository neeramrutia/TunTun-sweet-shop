export interface Sweet {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
  }
  

  export interface AuthResponse {
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      role?: string; // optional if you have admin/user
    };
  }
  

  export interface Sweet {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
  }
  