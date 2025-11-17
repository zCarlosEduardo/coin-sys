"use client";

import { useEffect, useState } from "react";
import { funcionarios } from "@/lib/funcionarios/funcionarios";

export default function MeuPerfil() {
  const [perfil, setPerfil] = useState<any>(null);

  useEffect(() => {
    const data = funcionarios.find((f) => f.id === "1");
    setPerfil(data);
  }, []);

  if (!perfil) return <div>Carregando...</div>;

  return (
    <div>
      <section className="container flex flex-col bg-white justify-center p-4 rounded-lg shadow-md m-4 mx-auto">
        <h1 className="text-2xl font-bold mb-4">Meu Perfil</h1>
        <p className="text-gray-700">
          Esta é a página do meu perfil. Aqui você pode ver e editar suas
          informações pessoais.
        </p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Nome: {perfil.nome}</h2>
          <p>Coins: {perfil.coins}</p>
          <p>Metas: {perfil.metas}</p>
          <p>Pontos: {perfil.pontos}</p>
          <p>Resgates: {perfil.resgates}</p>
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => alert("Pontos resgatados!")}
        >
          Resgatar Pontos
        </button>
      </section>
    </div>
  );
}
