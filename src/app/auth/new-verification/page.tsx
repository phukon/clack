import { NewVerificationForm } from "@/components/auth/NewVerificationForm";

const NewVerificationPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 overflow-x-hidden">
      <div className="flex-1 relative flex justify-center items-center">
        <div className=" bg-contain md:bg-fixed bg-center absolute inset-0 bg-[url('/showcase/cat.png')] md:bg-[url('/showcase/plant.png')]" />
        <div className="bg-white bg-opacity-45 rounded-lg shadow-md p-8 md:mx-8 relative z-10">
          <NewVerificationForm />
        </div>
      </div>
    </div>
  );
};

export default NewVerificationPage;
