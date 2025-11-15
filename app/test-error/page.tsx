"use client";

export default function TestError() {
  const causarErro = () => {
    throw new Error("Testando página de erro!");
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Testar Página de Erro</h1>
      <button
        onClick={causarErro}
        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
      >
        🔥 Causar Erro Proposital
      </button>
    </div>
  );
}