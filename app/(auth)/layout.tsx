import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main className="relative h-screen w-full">
      <div className="absolute size-full">
        <Image
          src={"/images/bg-img.png"}
          alt="background"
          fill
          className="size-full"
        />
      </div>
      {children}
    </main>
  );
};

export default AuthLayout;
