import { app } from '@/firebaseApp';
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
} from 'firebase/auth';
import { ReactNode, createContext } from 'react';

export interface AuthProps {
  handleSocalLogin: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const AuthContext = createContext<AuthProps | null>(null);

interface LoginProps {
  children: ReactNode;
}

interface AuthProviders {
  [key: string]: AuthProvider;
}

export const LoginProvider = ({ children }: LoginProps) => {
  const handleSocalLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    const providers: AuthProviders = {
      google: new GoogleAuthProvider(),
      github: new GithubAuthProvider(),
    };
    const provider = providers[id];
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ handleSocalLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
