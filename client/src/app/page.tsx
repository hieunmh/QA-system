import Header from "@/components/header";
import Image from "next/image";

export default async function Home() {


  return (
    <div className="w-screen h-screen bg-[#fafafc] flex items-center justify-center px-2 md:px-20">
      <Header />

      <div className="w-full flex flex-col md:flex-row text-center items-center justify-between">
        <div className="space-y-3">
          <p className="font-bold text-5xl">オンライン試験を受けます。</p>
          <p className="font-semibold text-2xl">アクティブユーザー数 <span className="text-[#4a3aff] font-black">200+</span></p>
        </div>

        <Image src={'/home.png'} alt="home" width={1000} height={1000} className="w-[350px]" />
      </div>
    </div>
  );
}
