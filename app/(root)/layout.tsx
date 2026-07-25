import Navbar from "@/components/navbar";
import AppPreloader from "@/components/app-preloader";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppPreloader>
      <Navbar />
      {children}
    </AppPreloader>
  );
}