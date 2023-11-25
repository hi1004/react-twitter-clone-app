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
import { toast } from 'react-toastify';

export interface AuthProps {
  handleSocalLogin?: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
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
  }, [auth, currentUser]);
  const handleSocalLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    const providers: AuthProviders = {
      'login-google': new GoogleAuthProvider(),
      google: new GoogleAuthProvider(),
      'login-github': new GoogleAuthProvider(),
      github: new GithubAuthProvider(),
    };
    const provider = providers[id];
    const auth = getAuth(app);
    try {
      await signInWithPopup(auth, provider);
      toast.success(
        `${auth.currentUser?.displayName}様、ログインに成功しました`
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <AuthContext.Provider value={{ handleSocalLogin, user: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
