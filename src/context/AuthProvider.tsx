import { 
    createContext, 
    useState, 
    ReactNode 
} from "react";

interface AuthData {
    access_token?: string,
    token_type?: string,
    user_email?: string,
    user_role?: string,
}

interface AuthContextType {
    auth: AuthData;
    setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ 
    children 
}: { 
    children: ReactNode
}) => {
    const [auth, setAuth] = useState<AuthData>({});
  
    return (
      <AuthContext.Provider 
            value={
                { 
                    auth, 
                    setAuth 
                }
            }
        >
        {children}
      </AuthContext.Provider>
    );
  };