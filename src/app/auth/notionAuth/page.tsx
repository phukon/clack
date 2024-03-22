"use client";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { notionOAuth } from "@/actions/notionOAuth";

const NotionAuth = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  // const state = searchParams.get("state"); Might use later.
  const errorParam = searchParams.get("error");

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

    // newVerification(token)
    //   .then((data) => {
    //     setSuccess(data.success);
    //     setError(data.error);
    //   })
    //   .catch(() => {
    //     setError("Something went wrong!");
    //   });
  }, [code, errorParam, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return <div>NotionAuth</div>;
};

export default NotionAuth;
