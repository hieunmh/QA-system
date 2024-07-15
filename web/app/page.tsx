import Header from "@/components/header";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-[#fafafc]">
      <Header />
      
      <div className="flex lg:flex-row flex-col h-full items-center justify-center lg:justify-between md:px-32 px-2">
        <div className="space-y-5 text-center">
          <p className="font-bold text-[50px]">オンライン試験を受けます。</p>
          <p className="uppercase text-base">
            現在アクティブユーザー数 {' '}
            <span className="text-[#4a3aff] font-bold">200+</span>
          </p>
        </div>

        <Image src='/home.png' alt="home" width={1000} height={1000} className="w-[400px]" />
      </div>
    </div>
  );
}
