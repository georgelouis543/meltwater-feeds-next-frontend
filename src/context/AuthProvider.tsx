import { AuthContextType, AuthData } from "@/types/auth";
import { 
    createContext, 
    useState, 
    ReactNode 
} from "react";

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

export default AuthContext