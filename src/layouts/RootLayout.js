import { Outlet, useLoaderData } from 'react-router-dom';

import { useEffect } from 'react';
import Header from './Header';

function RootLayout() {
    const token = useLoaderData(); //서버로부터 발급받는 인증 토큰
    useEffect(() => {
        if (!token) {
            return;
        }
    }, [token]);
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}

export default RootLayout;
