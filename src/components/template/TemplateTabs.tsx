import forkIcon from "../../assets/fork_icon.svg";
import palace from "../../assets/palace_icon.svg";
import badIcon from "../../assets/bed_icon.svg";
import { useState } from "react";

interface TemplateTabsProps {
  onClose: () => void;
  onClickAI: () => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedTab: "음식점" | "관광지" | "숙소";
  onTabChange: (tab: "음식점" | "관광지" | "숙소") => void;
  selectedTime: string;
  onTimeChange: (time: string) => void;
}

export default function TemplateTabs({
  onClose,
  onClickAI,
  setIsModalOpen,
  selectedTab,
  onTabChange,
  selectedTime,
  onTimeChange,
}: TemplateTabsProps) {
  return (
    <div className="space-y-4">
      {/* Category Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => onTabChange("음식점")}
          className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-1 ${
            selectedTab === "음식점"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          <img src={forkIcon} className="w-5" alt="음식점" /> 음식점
        </button>
        <button
          onClick={() => onTabChange("관광지")}
          className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-1 ${
            selectedTab === "관광지"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          <img src={palace} className="w-5" alt="관광지" /> 관광지
        </button>
        <button
          onClick={() => onTabChange("숙소")}
          className={`px-4 py-2 rounded-full border transition-colors flex items-center gap-1 ${
            selectedTab === "숙소"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          <img src={badIcon} className="w-5" alt="숙소" /> 숙소
        </button>
        {/* <button
          // onClick={}
          className={`px-6 py-2 bg-blue-500 text-white rounded-full border transition-colors flex items-center gap-1`}
        >
          검색
        </button> */}
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-full ml-auto hover:bg-blue-600 transition-colors"
          onClick={() => {
            onClose();
            onClickAI();
            setIsModalOpen(true);
          }}
        >
          정렬
        </button>
      </div>

      {/* Time Selection Buttons */}
      <div className="flex gap-2 pb-4">
        <button
          onClick={() => onTimeChange("am 6:00 ~ am 11:00")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedTime === "am 6:00 ~ am 11:00"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          am 6:00 ~ am 11:00
        </button>
        <button
          onClick={() => onTimeChange("am 11:00 ~ pm 5:00")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedTime === "am 11:00 ~ pm 5:00"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          am 11:00 ~ pm 5:00
        </button>
        <button
          onClick={() => onTimeChange("pm 5:00 ~ pm 10:00")}
          className={`px-4 py-2 rounded-full border transition-colors ${
            selectedTime === "pm 5:00 ~ pm 10:00"
              ? "border-[#40A7E8] border-3"
              : "border-gray-300"
          }`}
        >
          pm 5:00 ~ pm 10:00
        </button>
      </div>
    </div>
  );
}
