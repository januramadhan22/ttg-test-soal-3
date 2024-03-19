import Footer from "@/components/fragments/footer";
import Navbar from "@/components/fragments/navbar";
import CustomButton from "@/components/ui/button";
import productServices from "@/services/product/service";
import userServices from "@/services/user/service";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiSolidCart, BiSolidChevronLeft } from "react-icons/bi";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { status, data }: any = useSession();
  const { query, push, asPath }: any = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<any>(null);
  const handleGetDetailProduct = async () => {
    setIsLoading(true);
    try {
      const response = await productServices.getDetailProduct(query.id);
      setProduct(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong", {
        position: "top-right",
      });
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const response = await userServices.addToCart(
        [product],
        data?.accessToken
      );
      setIsLoading(false);
      if (response.status === 200) {
        toast.success("Successfully add to cart", {
          position: "top-right",
        });
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Failed add to cart", {
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    handleGetDetailProduct();
  }, [query.id]);

  return (
    <div className={`relative w-full h-[100dvh] flex flex-col`}>
      <Navbar />
      <div className="w-full h-[calc(100dvh-100px)] px-14 py-8 flex flex-col items-center gap-8 overflow-y-auto">
        <div className="w-full">
          <Link href={"/"}>
            <span className="flex items-center gap-2 text-xl font-medium text-primary-red">
              <BiSolidChevronLeft />
              Back
            </span>
          </Link>
        </div>
        <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="w-full lg:w-[35%] h-full rounded border border-primary-red overflow-clip ">
            <Image
              src={product?.images}
              alt={product?.title}
              width={300}
              height={300}
              className="w-full aspect-square rounded hover:scale-110 transition-all ease-in"
            />
          </div>
          <div className="lg:w-[60%] flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <h1 className="text-4xl font-semibold">{product?.title}</h1>
              <h3 className="text-2xl font-medium text-primary-red">
                Rp {parseInt(product?.price).toLocaleString("id-ID")}
              </h3>
            </div>
            <h5 className="text-lg">{product?.description}</h5>
            <div className="max-w-[200px]">
              <CustomButton
                label="Add to Cart"
                variant="filled"
                color="red"
                disabled={isLoading}
                onSubmit={() =>
                  status === "authenticated"
                    ? handleAddToCart()
                    : push(`/auth/login?callbackUrl=${asPath}`)
                }
              >
                <BiSolidCart className="text-xl" />
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
