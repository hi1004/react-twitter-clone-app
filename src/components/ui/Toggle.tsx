import ThemeContext from '@/context/ThemeContext';
import { useContext } from 'react';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

const Toggle = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      role="presentation"
      onClick={toggleTheme}
      className="w-max p-3 cursor-pointer dark:pointerhover:hover:bg-gray-700 pointerhover:hover:bg-gray-300 bg-opacity-30 dark:bg-opacity-30 rounded-[9999px]"
    >
      <DarkModeSwitch
        checked={isDark}
        onChange={toggleTheme}
        size={30}
        className=""
      />
    </div>
  );
};

export default Toggle;
