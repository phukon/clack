'use client'
import Link from 'next/link'

function Onboard() {

  const isLoginMode = true
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Left Black Box */}
      <div className="lg:w-1/2 bg-gray-900 text-white p-10 hidden lg:flex flex-col justify-between">
        <div>
          <img src='logo1.png' alt="Clack" className=" mr-2 h-20 w-20" />
          {/* <div className="text-lg font-medium">Clack </div> */}
        </div>

        <div className="text-sm text-gray-400 mt-4">
          <blockquote className="space">
            <p className="text-lg">&ldquo;Jibon Kosupator Pani&rdquo;</p>
            <footer className="text-sm">Zubeen Garg</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Authentication Form */}
      <div className="lg:w-1/2 flex-1 relative flex justify-center items-center">
        {/* Background Image */}
        <div
          className="bg-cover bg-center absolute inset-0 bg-[url('/showcase/a.jpg')]"
        />

        {/* Transparent Container */}
        <div className="bg-white bg-opacity-80 rounded-lg shadow-md p-8 mx-4 md:mx-8 mt-8 md:mt-0 relative z-10">
          <div className="mb-8 text-center">
            <div className="text-2xl font-medium">Clack </div>
            <h1 className="text-lg font-semibold mt-2">{isLoginMode ? 'Log in' : 'Create an Account'}</h1>
            <p className="text-sm text-gray-600">
              {isLoginMode
                ? 'Enter your username and password to log in'
                : 'Enter your email below to create your account'}
            </p>
          </div>
          <form className="space-y-4" onSubmit={() => console.log('yo')}>
            {!isLoginMode ? (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                {/* <input
                  type="email"
                  name="email"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                  placeholder="you@example.com"
                  required
                  id="email"
                  ref={userRef}
                  value={email}
                  onChange={handleUserInput}
                  autoComplete="off"
                /> */}
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                {/* <input
                  type="text"
                  name="username"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                  placeholder="Username"
                  required
                  id="username"
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="off"
                /> */}
              </div>
            ) : (
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                {/* <input
                  type="text"
                  name="username"
                  className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                  placeholder="Username"
                  required
                  id="username"
                  ref={userRef}
                  value={username}
                  onChange={handleUserInput}
                  autoComplete="off"
                /> */}
              </div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              {/* <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-3 w-full border border-gray-300 rounded-md"
                placeholder="Password"
                required
                onChange={handlePwdInput}
                value={password}
                autoComplete="on"
              /> */}
            </div>
            <p aria-live="assertive">
              error message here
            </p>
            {/* {isLoginMode && (
              <label htmlFor="persist" className="form__persist">
                <input type="checkbox" id="persist" onChange={handleToggle} checked={persist} />
                Trust This Device
              </label>
            )} */}
            <div>
              <button
                type="submit"
                className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark"
              >
                {/* {isLoginMode ? 'Log in' : 'Create Account'} */} conditional text here
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            By clicking "{isLoginMode ? 'Log in' : 'Create Account'}," you agree to our{' '}
            <Link href="/terms" className="text-primary">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-primary">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="text-sm text-gray-600 mt-2">
            {isLoginMode ? "Don't have an account? " : 'Already have an account? '}
            <button type="button" onClick={() => {}} className="text-primary underline">
              {isLoginMode ? 'Create one here' : 'Log in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Onboard
