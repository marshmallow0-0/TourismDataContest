import { Outlet, useLocation, useLoaderData } from 'react-router-dom'; 
import Header from './Header';
import { useEffect } from 'react';

function RootLayout() {
    const token = useLoaderData(); //서버로부터 발급받는 인증 토큰
    
    const location = useLocation();
    // 현재 경로가 "/login"일 때는 NavBar를 숨김
    const hideHeader = location.pathname === '/login' || location.pathname === '/auth';

    useEffect(() => {
        if (!token) {
            return;
        }
    }, [token]);
    return (
        <>
            {!hideHeader && <Header />}
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
