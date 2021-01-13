import { Chat } from './../components/Chat/Chat';
import { Home } from '../components/Home/Home';
import { Login } from '../components/Login/Login';

interface IRoute {
  path: string;
  component: () => JSX.Element;
}

export const publicRoutes: IRoute[] = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
];

export const privateRoutes: IRoute[] = [
  { path: '/', component: Home },
  { path: '/chat', component: Chat },
];
