import React from "react";

type ModalConfirmacaoProps = {
  show: boolean;
  statusAtivo: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ModalConfirmacao: React.FC<ModalConfirmacaoProps> = ({
  show,
  statusAtivo,
  onConfirm,
  onCancel,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
        <h3 className="text-xl font-bold mb-4 text-gray-800">
          {statusAtivo
            ? "Desativar Janela de Troca?"
            : "Ativar Janela de Troca?"}
        </h3>
        <p className="text-gray-600 mb-6">
          Tem certeza que deseja {statusAtivo ? "desativar" : "ativar"} a janela de
          troca?
        </p>
        <div className="flex gap-3 justify-center">
          <button
            className={`px-5 py-2 rounded-lg font-semibold shadow ${
              statusAtivo
                ? "bg-red-600 hover:bg-red-700 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
            }`}
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="px-5 py-2 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-800 shadow"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};