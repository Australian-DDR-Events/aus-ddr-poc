import {
  AuthenticationRepositoryContext,
  AuthenticationRepositoryContextInterface,
} from 'context/authentication';
import ImageUploader from 'features/admin/image-uploader';
import SongsManagement from 'features/admin/songs-management';
import Error from 'features/error';
import ForgotPassword from 'features/forgot-password';
import GraphqlTestbed from 'features/graphql-testbed';
import Home from 'features/home';
import Leaderboard from 'features/leaderboard';
import Login from 'features/login';
import Profile from 'features/profile';
import ProfileActive from 'features/profile-active';
import Register from 'features/register';
import React, { useContext, useEffect } from 'react';
import { Title } from 'react-head';
import { Route, RouteProps, Switch, useLocation } from 'wouter';

const ProtectedRoute = (props: RouteProps) => {
  const authRepo = useContext<AuthenticationRepositoryContextInterface>(
    AuthenticationRepositoryContext,
  );
  const [, setLocation] = useLocation();
  useEffect(() => {
    const loggedInUser = authRepo.authenticationRepositoryInstance
      .get()
      .okOrDefault();
    if (!loggedInUser.id) {
      setLocation('/login');
    }
  }, []);
  return <Route {...props} />;
};

const Router = () => (
  <Switch>
    <Route path="/">
      <Title>Australian DDR Events</Title>
      <Home />
    </Route>
    <Route path="/login">
      <Title>Login | Australian DDR Events</Title>
      <Login />
    </Route>
    <Route path="/register">
      <Title>Register | Australian DDR Events</Title>
      <Register />
    </Route>
    <Route path="/forgot-password">
      <Title>Forgot password | Australian DDR Events</Title>
      <ForgotPassword />
    </Route>
    <ProtectedRoute path="/profile">
      <Title>Profile | Australian DDR Events</Title>
      <ProfileActive />
    </ProtectedRoute>
    <ProtectedRoute path="/profile/:id">
      {(params) => (
        <>
          <Title>Profile | Australian DDR Events</Title>
          <Profile id={params.id} />
        </>
      )}
    </ProtectedRoute>
    <Route path="/leaderboard">
      <Title>Leaderboards | Australian DDR Events</Title>
      <Leaderboard />
    </Route>
    <Route path="/leaderboard/:id">
      {(params) => (
        <>
          <Title>Leaderboards | Australian DDR Events</Title>
          <Leaderboard songDifficultyId={params.id} />
        </>
      )}
    </Route>
    <Route path="/testbed">
      <GraphqlTestbed />
    </Route>
    <ProtectedRoute path="/admin/uploadimage">
      <Title>Image uploading | Australian DDR Events</Title>
      <ImageUploader />
    </ProtectedRoute>
    <Route path="/admin/songs">
      <Title>Manage songs | Australian DDR Events</Title>
      <SongsManagement />
    </Route>
    <Route>
      <Error />
    </Route>
  </Switch>
);

export default Router;
