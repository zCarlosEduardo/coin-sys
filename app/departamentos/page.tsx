import DepartamentosClient from "./DepartamentosClient";

export const metadata = {
  title: "Departamentos - Coin System",
  description: "Visualize todos os departamentos da empresa",
};

export default function DepartamentosPage() {
  return <DepartamentosClient />;
}

export const dynamic = "force-static";