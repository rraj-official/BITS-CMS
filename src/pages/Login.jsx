import React from 'react'

const Login = () => {
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-10 lg:px-8 bg-[#f6f8f9]">
                <div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
                        <h2 className="mt-10 mb-10 text-center text-2xl leading-9 tracking-tight text-gray-500">
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
                    </div>
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div>
                                <h2 className="mb-10 text-center text-2xl leading-9 tracking-tight text-gray-500">
                                    Admin Login
                                </h2>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-500">
                                    Username/Phone Number
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    // onChange={(e) => {
                                    //     setUsernameLog(e.target.value);
                                    // }}
                                    />
                                </div>
                            </div>

                            <div>

                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-500">
                                    Password
                                </label>


                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    // onChange={(e) => {
                                    //     setPasswordLog(e.target.value);
                                    // }}
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#215fc9] px-3 py-1.5 transition duration-150 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#463ed8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                // onClick={login}
                                >
                                    Sign in
                                </button>
                            </div>
                            {/* Renders only if Login credentials are incorrect */}
                            {/* {incorrectCredential && (
                                    <div className='text-white text-center'>Incorrect Login credentials</div>
                                )} */}
                        </form>

                        {/* <p className="mt-10 text-center text-sm text-white">
                                New member?{' '}
                                <a href="/register" className="font-semibold leading-6 text-[#e09758] hover:text-[#e09740]">
                                    Register Now
                                </a>
                            </p> */}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login