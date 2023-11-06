import { app } from '@/firebaseApp';
import {
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';
import { ReactNode, createContext, useEffect, useState } from 'react';

export interface AuthProps {
  handleSocalLogin: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  user: User | null;
}
export interface AuthPropsWithLogin extends AuthProps {
  handleSocalLogin: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
}

const AuthContext = createContext<AuthProps | null>(null);

interface LoginProps {
  children: ReactNode;
}

interface AuthProviders {
  [key: string]: AuthProvider;
}

export const AuthContextProvider = ({ children }: LoginProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
  }, [auth]);
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
    <AuthContext.Provider value={{ handleSocalLogin, user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
