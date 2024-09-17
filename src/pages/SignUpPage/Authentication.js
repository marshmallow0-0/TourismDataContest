import { json, redirect, useNavigate } from 'react-router-dom';
import LoginPage from '../LoginPage/Login';
import SignUpPage from './SignUpPage';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function AuthenticationPage() {
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode');
    const navigate = useNavigate();

    useEffect(() => {
        if (!mode) {
            navigate('?mode=login', { replace: true });
        }
    }, [mode, navigate]);

    return mode === 'signup' ? <SignUpPage /> : <LoginPage />;
}

export default AuthenticationPage;

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        return json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };
}