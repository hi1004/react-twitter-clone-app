import LoginForm from '@/components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const onAccountClick = () => {
    navigate('/signup');
  };
  return <LoginForm onAccountClick={onAccountClick} />;
};

export default LoginPage;
