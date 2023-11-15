import RootLayout from '@/components/layout/RootLayout';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import NotificationsPage from '@/pages/notifications';
import PostDetailPage from '@/pages/posts/detail';
import PostEditPage from '@/pages/posts/edit';
import ProfilePage from '@/pages/profile';
import SearchPage from '@/pages/search';

import { Navigate, Route, Routes } from 'react-router-dom';

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <Route element={<RootLayout isHeader={true} />}>
          <Route index element={<HomePage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/edit/:id" element={<PostEditPage />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      ) : (
        <Route element={<RootLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
