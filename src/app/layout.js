import './globals.css';
import AuthGuard from '../components/AuthGuard';
export const metadata = { title: 'Story Seed · 나의 집필 공간', description: '작품, 회차, 인물과 세계관을 모으는 나의 집필 공간' };
export default function Layout({children}) { return <html lang="ko"><body><AuthGuard>{children}</AuthGuard></body></html>; }
