import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import PostDetailPage from '@/pages/posts/detail';
import PostEditPage from '@/pages/posts/edit';
import ProfilePage from '@/pages/profile';

import { Navigate, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <Routes>
      <Route element={<RootLayout isHeader={false} />}>
        <Route index element={<HomePage />} />
        <Route path="/posts/:id" element={<PostDetailPage />} />
        <Route path="/posts/edit/:id" element={<PostEditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route element={<RootLayout isNav={false} />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};

export default Router;
