import React, { ReactNode, createContext, useContext, useReducer } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

type AuthAction = { type: 'LOGIN'; payload: string } | { type: 'LOGOUT' };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { isAuthenticated: true, user: action.payload };
    case 'LOGOUT':
      return { isAuthenticated: false, user: null };
    default:
      return state;
  }
};

const AuthContext = createContext<{ state: AuthState; dispatch: React.Dispatch<AuthAction> } | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, { isAuthenticated: false, user: null });
  return <AuthContext.Provider value={{ state, dispatch }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
