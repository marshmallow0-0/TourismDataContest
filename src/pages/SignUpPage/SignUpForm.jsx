import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useSearchParams, useActionData, useNavigate, useNavigation } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

// const API_BASE_URL = "http://localhost:8000";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

const showErrorAlert = () => {
    Swal.fire({
        icon: 'error',
        title: '중복된 정보!',
        text: '이메일 또는 아이디가 중복된 상태입니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#3085d6',
    });
};

const showSuccessAlert = () => {
    Swal.fire({
        icon: 'success',
        title: '가입 성공!',
        text: '회원가입이 완료되었습니다!',
        confirmButtonText: '확인',
        confirmButtonColor: '#3085d6',
    });
};

const InputField = ({ type, id, name, placeholder, value, onChange }) => {
    return (
        <input
            type={type}
            id={id}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
    );
};

const SignupSchema = Yup.object().shape({
    userId: Yup.string()
        .min(5, '아이디는 5자 이상이어야 합니다.')
        .required('아이디는 필수 항목입니다.'),
    email: Yup.string()
        .email('유효한 이메일 주소를 입력하세요.')
        .required('이메일은 필수 항목입니다.'),
    password: Yup.string()
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .matches(/[a-zA-Z]/, '비밀번호는 영문자와 숫자를 포함해야 합니다.')
        .required('비밀번호는 필수 항목입니다.'),
    passwordConfirm: Yup.string()
        .oneOf([Yup.ref('password'), null], '비밀번호가 일치하지 않습니다.')
        .required('비밀번호 재입력은 필수 항목입니다.')
});

function SignUpForm() {
    const data = useActionData();
    const navigation = useNavigation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';
    const [errors, setErrors] = useState({});

    const handleCancel = () => {
        navigate('/auth');
    };

    const handleButtonClick = () => {
        const mode = isLogin ? 'signup' : 'login';
        navigate(`?mode=${mode}`);
    };

    const handleCheckDuplicateUserId = async (userId) => {
        try {
            const response = await axios.post('/api/check-userid', { userId });
            if (response.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userId: '이미 존재하는 아이디입니다.'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    userId: ''
                }));
                alert('사용 가능한 아이디입니다.');
            }
        } catch (error) {
            console.error('Error checking userId:', error);
        }
    };

    const handleCheckDuplicateEmail = async (email) => {
        try {
            const response = await axios.post('/api/check-email', { email });
            if (response.data.exists) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: '이미 존재하는 이메일입니다.'
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    email: ''
                }));
                alert('사용 가능한 이메일입니다.');
            }
        } catch (error) {
            console.error('Error checking email:', error);
        }
    };

    return (
        <Formik
            initialValues={{
                userId: '',
                userNickName: '',
                email: '',
                password: '',
                passwordConfirm: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values, { setSubmitting, setErrors }) => {
                setSubmitting(true);
                try {
                    // 서버에 가입 요청
                    const response = await axios.post(`${API_BASE_URL}/user/register`, {
                        id: values.userId,
                        nickname: values.userNickName,
                        email: values.email,
                        password: values.password,
                        // passwordConfirm: values.passwordConfirm
                    });


                    // 가입 성공 시 성공 알림 호출
                    showSuccessAlert();
                    
                    navigate('/auth'); // 예: 로그인 페이지로 이동
                } catch (error) {
                    // 에러 발생 시 SweetAlert2를 통한 알림 창 띄우기
                    showErrorAlert();
                    if (error.response && error.response.data) {
                        // 서버로부터의 에러 메시지 처리
                        setErrors({ server: error.response.data.message });
                    } else {
                        console.error('잘못된 폼 제출', error);
                    }
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ handleChange, values, isSubmitting, errors }) => (
                <Form>
                    <h1>.</h1>
                    {errors.server && <div className="text-red-500">{errors.server}</div>}

                    {data && data.errors && (
                        <ul>
                            {Object.values(data.errors).map(err => <li key={err}>{err}</li>)}
                        </ul>
                    )}
                    {data && data.message && <p>{data.message}</p>}
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20">
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700">아이디</label>
                        <div className="flex items-center space-x-2">
                            <Field
                                id="userId"
                                name="userId"
                                type="text"
                                placeholder="아이디 입력 (6 ~20자)"
                                className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleChange}
                                value={values.userId}
                            />
                            {/* <button
                                type="button"
                                className="py-2 px-4 whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md text-xs transition duration-300 ease-in-out focus:outline-none"
                                onClick={() => handleCheckDuplicateUserId(values.userId)}
                            >
                                중복확인
                            </button> */}
                        </div>
                        <ErrorMessage name="userId" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">이메일 주소</label>
                        <div className="flex items-center space-x-2">
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="이메일 주소"
                                className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                onChange={handleChange}
                                value={values.email}
                            />
                            {/* <button
                                type="button"
                                className="py-2 px-4 whitespace-nowrap bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow-md text-xs transition duration-300 ease-in-out focus:outline-none"
                                onClick={() => handleCheckDuplicateEmail(values.email)}
                            >
                                중복확인
                            </button> */}
                        </div>
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="userNickName" className="block text-sm font-medium text-gray-700 mt-4">닉네임</label>
                        <Field
                            id="userNickName"
                            name="userNickName"
                            type="text"
                            placeholder="닉네임 입력 (6~20자)"
                            className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={values.userNickName}
                        />
                        <ErrorMessage name="userNickName" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">비밀번호</label>
                        <Field
                            id="password"
                            name="password"
                            type="password"
                            placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)"
                            className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={values.password}
                        />
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

                        <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700 mt-4">비밀번호 재입력</label>
                        <Field
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            placeholder="비밀번호 재입력"
                            className="bg-blue-50 my-2 shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleChange}
                            value={values.passwordConfirm}
                        />
                        <ErrorMessage name="passwordConfirm" component="div" className="text-red-500 text-sm" />
                        <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`py-2 px-2 bg-blue-500 hover:bg-blue-600 rounded-md transform ease-in-out duration-200 text-white text-sm font-semibold focus:outline-none ${isSubmitting ? 'opacity-50' : ''}`}
                            >
                                {isSubmitting ? '가입 중...' : '가입하기'}
                            </button>
                            <button
                                type="button"
                                className="ml-4 py-2 px-2 bg-red-500 hover:bg-red-600 rounded-md transform ease-in-out duration-200 text-white text-sm font-semibold focus:outline-none"
                                onClick={handleCancel}
                            >
                                가입취소
                            </button>
                        </div>

                        {/* <div className="mt-6 flex justify-between">
                            <button
                                type="submit"
                                className="py-2 px-2 bg-blue-500 hover:bg-blue-600 rounded-md transform ease-in-out duration-200 text-white text-sm font-semibold focus:outline-none"
                            >
                                가입하기
                            </button>
                            <button
                                type="button"
                                className="ml-4 py-2 px-2 bg-red-500 hover:bg-red-600 rounded-md transform ease-in-out duration-200 text-white text-sm font-semibold focus:outline-none"
                                onClick={handleCancel}
                            >
                                가입취소
                            </button>
                        </div> */}
                    </div>
                </Form>
            )}
        </Formik>
    );
}

export default SignUpForm;
