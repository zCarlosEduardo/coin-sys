
import ComoFunciona from "@/components/Home/ComoFunciona";
import TopFuncionarios from "@/components/Home/TopFuncionarios";
import { Copyright } from "lucide-react";

export default function Home() {
  return (
    <div>
      <section className="container flex flex-col bg-white justify-center p-4 rounded-lg shadow-md m-4 mx-auto">
        <div className="flex items-center gap-4 sm:ml-16 md:ml-24 lg:ml-32 space-y-5 md:space-y-0 md:flex-row mb-6">
          <div className="rounded-xl w-12 h-12 md:w-16 md:h-16 bg-linear-to-br from-sky-400 via-blue-500 to-green-600 shadow-md items-center flex justify-center text-white">
            <Copyright size={42} />
          </div>
          <div className="-space-y-1">
            <h1 className="font-bold text-2xl">ARX Coins</h1>
            <span className="text-sm w-max">Sistema de Recompensas & Reconhecimento</span>
          </div>
        </div>
        <ComoFunciona />
        <TopFuncionarios />
      </section>
    </div>
  );
}
