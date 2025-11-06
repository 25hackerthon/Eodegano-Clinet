import { useState } from "react";

interface TeleportDelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (inputValue?: string) => void;
  templateTitle: string | undefined;
  Modal: string | undefined;
}

export default function TeleportModal({
  isOpen,
  onClose,
  onConfirm,
  Modal,
}: TeleportDelModalProps) {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (Modal === "추가" && !inputValue.trim()) {
      return;
    }
    onConfirm(inputValue);
    onClose();
    setInputValue("");
  };

  const isConfirmDisabled = Modal === "추가" && !inputValue.trim();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ zIndex: 9999 }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-sm w-full p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {`템플릿을 ${
            Modal === "정렬" ? "정렬" : Modal === "추가" ? "추가" : "삭제"
          }하시겠습니까?`}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          {Modal === "정렬"
            ? "AI가 혼잡도, 날씨, 시간 등을 고려하여 템플릿을 정렬합니다."
            : Modal === "추가"
            ? "템플릿 목록에서 해당 템플릿이 추가됩니다."
            : "템플릿 목록에서 해당 템플릿을 삭제합니다."}
        </p>
        {Modal === "추가" ? (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="템플릿 이름"
            className="border w-full mb-3 p-2 rounded-lg"
          />
        ) : (
          ""
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            취소
          </button>
          <button
            onClick={handleConfirm}
            disabled={isConfirmDisabled}
            className="px-6 py-2.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
