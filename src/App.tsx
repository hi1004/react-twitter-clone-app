import Router from '@/components/Router';
import ThemeContext from '@/context/ThemeContext';
import { app } from '@/firebaseApp';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { RiTwitterXLine } from 'react-icons/ri';
import { Theme, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const auth = getAuth(app);
  const [init, setInit] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!auth?.currentUser
  );
  const { isDark } = useContext(ThemeContext);
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
    <div className="min-h-[1008px]">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={(isDark ? 'dark' : 'light') as Theme}
      />
      {init ? (
        <Router isAuthenticated={isAuthenticated} />
      ) : (
        <RiTwitterXLine
          size={40}
          className="fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
        />
      )}
    </div>
  );
};

export default App;
