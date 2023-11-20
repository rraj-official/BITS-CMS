import React from 'react'

const Login = () => {
    return (
        <>
            <div className="h-screen flex flex-1 flex-col px-6 pb-10 lg:px-8 bg-[#f6f8f9]">
                <div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center mt-20">
                        <h2 className="mt-10 mb-10 text-center text-2xl leading-9 tracking-tight text-gray-600">
                            Student Login
                        </h2>
                        <button className="bg-white w-full px-4 py-2 border flex justify-center gap-2 rounded-md text-black dark:text-gray-500  hover:text-slate-900 dark:hover:text-black hover:shadow transition duration-150">
                            <img
                                className="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                loading="lazy"
                                alt="google logo"
                            />
                            <span>Sign in with Google</span>
                        </button>
                        <div className='w-full h-[1px] m-10 bg-gray-300'></div>
                        <p className="text-center text-xs text-gray-600">
                            For Admin Log in:{' '}
                            <a href="/adminlogin" className="font-semibold leading-6 text-[#18185d] hover:text-[#4747b1]">
                                Click Here
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login