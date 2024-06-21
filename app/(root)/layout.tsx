import LeftSidebar from "@/components/LeftSidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <main>
        <LeftSidebar />
        {children}
        <p className="text-white-1">RIGHT SIDEBAR</p>
      </main>
    </div>
  );
};

export default RootLayout;
