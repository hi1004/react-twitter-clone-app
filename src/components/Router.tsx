import RootLayout from '@/components/layout/RootLayout';
import Loader from '@/components/ui/Loader';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/auth/login';
import SignupPage from '@/pages/auth/signup';
import NotificationsPage from '@/pages/notifications';
import PostEditPage from '@/pages/posts/edit';
import ProfilePage from '@/pages/profile';
import SearchPage from '@/pages/search';
import React, { Suspense } from 'react';

import { Navigate, Route, Routes } from 'react-router-dom';

const PostDetailPage = React.lazy(() => import('@/pages/posts/detail'));

interface RouterProps {
  isAuthenticated: boolean;
}

const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <Routes>
      {isAuthenticated ? (
        <Route element={<RootLayout isHeader={true} />}>
          <Route index element={<HomePage />} />
          <Route
            path="/posts/:id"
            element={
              <Suspense fallback={<Loader />}>
                <PostDetailPage />
              </Suspense>
            }
          />
          <Route path="/posts/edit/:id" element={<PostEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      ) : (
        <Route element={<RootLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>
      )}
    </Routes>
  );
};

export default Router;
