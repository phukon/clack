"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { notionOAuth } from "@/actions/notionOAuth";
import CardWrapper from "@/components/auth/CardWrapper";
import { BeatLoader } from "react-spinners";
import FormSuccess from "@/components/form-success";
import FormError from "@/components/form-error";

const NotionAuth = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  // const state = searchParams.get("state"); Might use later.
  // const errorParam = searchParams.get("error");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!code) {
      setError("Missing code!");
      return;
    }

    notionOAuth({ code })
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [code, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100 overflow-x-hidden">
      <div className="flex-1 relative flex justify-center items-center">
        <div className=" bg-contain md:bg-fixed bg-center absolute inset-0 bg-[url('/showcase/cat.png')] md:bg-[url('/showcase/plant.png')]" />
        <div className="bg-white bg-opacity-45 rounded-lg shadow-md p-8 md:mx-8 relative z-10">
          <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to settings"
            backButtonHref="/dash/settings"
          >
            <div className="flex items-center w-full justify-center">
              {!success && !error && <BeatLoader />}
              <FormSuccess message={success} />
              {!success && <FormError message={error} />}
            </div>
          </CardWrapper>
        </div>
      </div>
    </div>
  );
};

export default NotionAuth;
