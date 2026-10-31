import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { BackHandler, Linking, Platform } from 'react-native';

/**
 * Tiny dependency-free router.
 *  - Web:    uses the URL hash  (e.g. https://site.com/#/courses)  so it works on any static host.
 *  - Native: keeps an in-memory history stack and handles the Android back button.
 */
const Ctx = createContext(null);

export const ROUTES = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'courses', path: '/courses' },
  { name: 'course', path: '/courses/:slug' },
  { name: 'careerLabs', path: '/career-labs' },
  { name: 'academy', path: '/academy' },
  { name: 'care', path: '/zalomi-care' },
  { name: 'abroad', path: '/study-abroad' },
  { name: 'blog', path: '/blog' },
  { name: 'post', path: '/blog/:slug' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' },
  { name: 'admission', path: '/admission' },
  { name: 'paymentResult', path: '/payment-result' },
  { name: 'portal', path: '/student-portal' },
  { name: 'legal', path: '/legal/:kind' },
];

export function matchRoute(fullPath) {
  const [pathOnly, query = ''] = fullPath.split('?');
  const clean = pathOnly.replace(/\/+$/, '') || '/';
  const queryParams = {};
  query.split('&').filter(Boolean).forEach((kv) => {
    const [k, v = ''] = kv.split('=');
    queryParams[decodeURIComponent(k)] = decodeURIComponent(v);
  });
  for (const r of ROUTES) {
    const rp = r.path.split('/');
    const cp = clean.split('/');
    if (rp.length !== cp.length) continue;
    const params = {};
    let ok = true;
    rp.forEach((seg, i) => {
      if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(cp[i]);
      else if (seg !== cp[i]) ok = false;
    });
    if (ok) return { name: r.name, params: { ...params, ...queryParams }, path: fullPath };
  }
  return { name: 'home', params: {}, path: '/' };
}

const readHash = () => {
  if (typeof window === 'undefined') return '/';
  const h = window.location.hash.replace(/^#/, '');
  return h || '/';
};

export function RouterProvider({ children }) {
  const [path, setPath] = useState(Platform.OS === 'web' ? readHash() : '/');
  const stack = useRef(['/']);

  useEffect(() => {
    if (Platform.OS === 'web') {
      const onHash = () => setPath(readHash());
      window.addEventListener('hashchange', onHash);
      return () => window.removeEventListener('hashchange', onHash);
    }
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.current.length > 1) {
        stack.current.pop();
        setPath(stack.current[stack.current.length - 1]);
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, []);

  const navigate = useCallback((to) => {
    if (/^(https?:|mailto:|tel:)/.test(to)) {
      Linking.openURL(to);
      return;
    }
    if (Platform.OS === 'web') {
      window.location.hash = to;
    } else {
      stack.current.push(to);
      setPath(to);
    }
  }, []);

  const goBack = useCallback(() => {
    if (Platform.OS === 'web') window.history.back();
    else if (stack.current.length > 1) {
      stack.current.pop();
      setPath(stack.current[stack.current.length - 1]);
    }
  }, []);

  const route = useMemo(() => matchRoute(path), [path]);
  const value = useMemo(() => ({ route, navigate, goBack }), [route, navigate, goBack]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useRouter = () => useContext(Ctx);
