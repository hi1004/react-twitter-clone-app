import Router from '@/components/Router';
import { app } from '@/firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';

const App = () => {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      setInit(true);
    });
  }, [auth, init]);

  return (
    <>
      {init ? (
        <Router isAuthenticated={isAuthenticated} />
      ) : (
        <RiTwitterXLine
          size={40}
          className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
      )}
    </>
  );
};

export default App;
