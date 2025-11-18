import React, { useState, useCallback } from "react";
import { ShoppingBasket } from "lucide-react";
import { ModalConfirmacao } from "./ModalConfirmacao";

type JanelaTrocaProps = {
  statusAtivo: boolean;
  onToggle: () => void;
};

export const JanelaTroca: React.FC<JanelaTrocaProps> = ({
  statusAtivo,
  onToggle,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleConfirm = useCallback(() => {
    onToggle();
    setShowConfirm(false);
  }, [onToggle]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
        <ShoppingBasket className="text-gray-600" />
        Janela de troca
      </h2>

      <div className="space-y-4">
        <div
          className={`p-4 ${
            statusAtivo
              ? "bg-green-200 border-green-600"
              : "bg-red-200 border-red-600"
          } rounded-r-xl shadow-md border-l-6`}
        >
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Status
          </label>
          <p className="text-xl font-bold text-gray-800">
            {statusAtivo ? "Ativa" : "Inativa"}
          </p>
        </div>
        <button
          className={`w-full ${
            statusAtivo
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } transition-all text-white px-6 py-3 rounded-lg shadow hover:shadow-md text-lg font-bold flex items-center justify-center gap-3`}
          onClick={() => setShowConfirm(true)}
        >
          {statusAtivo ? "Desativar" : "Ativar"}
        </button>
      </div>

      <ModalConfirmacao
        show={showConfirm}
        statusAtivo={statusAtivo}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
};
