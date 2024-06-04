import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

const redirectIfAuthenticated: Handle = async ({ event, resolve }) => {
  const authSession = event.cookies.get('auth');

  if (authSession && ['/login', '/register'].includes(event.url.pathname)) {
    throw redirect(302, '/');
  }

  return await resolve(event);
};

const authenticated: Handle = async ({ event, resolve }) => {
  const authSession = event.cookies.get('auth');

  if (!authSession && ['/project/config', '/project/create', '/project/style-config', '/'].includes(event.url.pathname)) {
    event.cookies.set('redirect', event.url.pathname, { path: '/' });
    throw redirect(302, '/login');
  }

  return await resolve(event);
};

export const handle: Handle = async (input) => {
  const { event, resolve } = input;

  if (['/login', '/register'].includes(event.url.pathname)) {
    return redirectIfAuthenticated(input);
  }

  if (
    ['/project/config', '/project/create', '/project/style-config', '/'].includes(event.url.pathname)
  ) {
    return authenticated(input);
  }

  return resolve(event);
};
