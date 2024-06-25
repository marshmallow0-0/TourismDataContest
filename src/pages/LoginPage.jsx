import React, { useState } from 'react';

const LoginPage = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        console.log('Email', Email);
        console.log('Password', Password);
    }

    return (
        <div className="flex justify-center items-center w-full h-screen">
            <form className="flex flex-col" onSubmit={onSubmitHandler}>
                <img className="w-10 h-10 ml-2" src={`${process.env.PUBLIC_URL}/img/logo.png`} alt="Logo" />
                <label className="mb-2">Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} className="mb-4 p-2 border rounded" />
                <label className="mb-2">Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} className="mb-4 p-2 border rounded" />
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage;