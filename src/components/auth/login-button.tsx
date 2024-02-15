'use client';
import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  modal?: 'modal' | 'redirect';
  asChild?: boolean;
}

const LoginButton = ({
  children,
  modal = 'redirect',
  asChild,
}: LoginButtonProps) => {

  const router = useRouter()
  const onClick = () => {
    console.log('login button clicked');
    router.push('/auth/login')
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
