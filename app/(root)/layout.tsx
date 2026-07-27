import Navbar from "@/components/navbar";
import AppPreloader from "@/components/app-preloader";
import Footer from "@/components/footer";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppPreloader>
      <Navbar />
      {children}
      <Footer />
    </AppPreloader>
  );
}