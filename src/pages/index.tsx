import Footer from "@/components/fragments/footer";
import Navbar from "@/components/fragments/navbar";

export default function Home() {
  return (
    <main
      className={`relative w-full min-h-[100dvh] flex flex-col justify-between`}
    >
      <Navbar />
      <Footer />
    </main>
  );
}
