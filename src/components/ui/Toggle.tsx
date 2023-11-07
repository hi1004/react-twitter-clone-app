import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Toggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return <DarkModeSwitch checked={isDark} onChange={toggleTheme} size={30} />;
};

export default Toggle;
