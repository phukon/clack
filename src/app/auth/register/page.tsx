import RegisterForm from "@/components/auth/RegisterForm";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 overflow-x-hidden">
      {/* Left Black Box */}
      <div className=" lg:w-2/5 bg-gray-900 text-white p-10 hidden lg:flex flex-col justify-between">
        <Link href="/">
          <Image src="/logo-white.png" width={500} height={500} alt="Clack" className=" mr-2 h-20 w-20" />
          {/* <div className="text-lg font-medium">Clack </div> */}
        </Link>

        <div className="text-sm text-gray-400 mt-4">
          <blockquote className="space">
            <p className="text-lg">&ldquo;Consistency is the last resort of the unimaginative&rdquo;</p>
            <footer className="text-sm">Oscar Wilde</footer>
          </blockquote>
        </div>
      </div>

      {/* Right Authentication Form */}
      <div className="lg:w-3/5 flex-1 relative flex justify-center items-center">
        {/* Background Image- bg-[url('/showcase/bg.png')] */}
          <div className=" bg-contain md:bg-cover bg-center absolute inset-0 bg-[url('/showcase/cat.png')] md:bg-[url('/showcase/plane.png')]" />


        {/* Transparent Container */}
        <div className="bg-white bg-opacity-45 rounded-lg shadow-md p-8 md:mx-8 relative z-10">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
