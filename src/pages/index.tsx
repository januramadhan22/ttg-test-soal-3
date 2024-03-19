import Footer from "@/components/fragments/footer";
import Navbar from "@/components/fragments/navbar";
import productServices from "@/services/product/service";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AdminProductPage from "./admin/products";

export default function Home() {
  const { data }: any = useSession();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const handleGetAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await productServices.getAllProduct();
      setProducts(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  if (data?.user.role === "admin") {
    return <AdminProductPage />;
  }

  return (
    <main className={`relative w-full h-[100dvh] flex flex-col`}>
      <Navbar />
      <div className="w-full h-[calc(100dvh-140px)] px-14 py-8 flex flex-col items-center gap-8 overflow-y-auto">
        <h1 className="text-3xl font-medium text-primary-red">All Products</h1>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
          {products?.map((product: any, index: number) => (
            <div key={index} className="w-full flex flex-col">
              <Link href={`/product/${product?.id}`}>
                <div className="w-full h-full rounded border border-primary-red overflow-clip cursor-pointer">
                  <Image
                    src={product?.images}
                    alt={product?.title}
                    width={300}
                    height={300}
                    className="w-full aspect-square rounded hover:scale-110 transition-all ease-in"
                  />
                </div>
              </Link>
              <div className="w-full p-2">
                <h4 className="text-xl font-medium">{product?.title}</h4>
                <p className="text-base text-primary-red">
                  Rp {parseInt(product?.price).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
