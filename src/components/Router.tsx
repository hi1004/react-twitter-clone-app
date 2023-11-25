import RootLayout from '@/components/layout/RootLayout';
import AuthContext, { AuthProps } from '@/context/AuthContext';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import NotificationsPage from '@/pages/notifications';
import PostDetailPage from '@/pages/posts/detail';
import PostEditPage from '@/pages/posts/edit';
import ProfilePage from '@/pages/profile';
import MyProfileInfoPage from '@/pages/profile/MyProfileInfo';
import SearchPage from '@/pages/search';
import { useContext } from 'react';

import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  const { user } = useContext(AuthContext as React.Context<AuthProps>);
  const { pathname } = useLocation();
  const pathId = pathname.split('/profile/').join('');
  const commonRoutes = (
    <Route element={<RootLayout />}>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Route>
  );
  const authenticatedRoutes = (
    <Route element={<RootLayout isHeader={true} />}>
      <Route index element={<HomePage />} />
      <Route path="/posts/:id" element={<PostDetailPage />} />
      <Route path="/posts/edit/:id" element={<PostEditPage />} />
      <Route
        path="/profile/:id"
        element={
          pathId === user?.uid ? (
            <MyProfileInfoPage user={user} />
          ) : (
            <ProfilePage />
          )
        }
      />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Route>
  );

  return (
    <Routes>{isAuthenticated ? authenticatedRoutes : commonRoutes}</Routes>
  );
};

export default Router;
