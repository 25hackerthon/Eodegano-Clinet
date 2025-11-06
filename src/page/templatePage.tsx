import { useState, useEffect } from "react";
import Header from "../components/Header";
import TemplateTabs from "../components/template/TemplateTabs";
import TemplateCarousel from "../components/template/TemplateCarousel";
import NavigationButtons from "../components/template/NavigationButtons";
import TeleportDelModal from "../components/modal/TeleportModal";
import PlaceDetailModal from "../components/modal/PlaceDetailModal";
import { tripPlaceGetApi } from "../api/place/tripPlaceGetApi";
import { tripPlacePostApi } from "../api/place/tripPlacePostApi";
import { tripPlaceDelApi } from "../api/place/tripPlaceDelApi";
import { recommendApi } from "../api/recommendApi";
import { useTripId } from "../hooks/tripId";

interface Template {
  id: number;
  title: string;
  subtitle: string;
  tags: string;
  image: string;
  lat?: number; // optional로 변경
  lng?: number; // optional로 변경
  description?: string;
  type: "음식점" | "관광지" | "숙소";
  congestionByTime?: {
    morning: number;
    afternoon: number;
    evening: number;
  };
}

export default function TemplatePage() {
  const { tripId } = useTripId();

  const [selectedTab, setSelectedTab] = useState<"음식점" | "관광지" | "숙소">(
    "음식점"
  );
  const [selectedTime, setSelectedTime] =
    useState<string>("am 11:00 ~ pm 5:00");
  const [selectedPlace, setSelectedPlace] = useState<Template | null>(null);
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      title: "석굴암",
      subtitle: "신라 천년 유네스코 세계유산",
      description: "상세 설명이 없습니다.",
      tags: "#유명관광지 #문화재 #유네스코",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      lat: 35.7846,
      lng: 129.3475,
      type: "관광지",
      congestionByTime: {
        morning: 45,
        afternoon: 75,
        evening: 30,
      },
    },
    {
      id: 2,
      title: "안압지",
      subtitle: "신라의 시대 귀족 정원",
      description: "상세 설명이 없습니다.",
      tags: "#유명관광지 #문화재 #유네스코",
      image:
        "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=300&fit=crop",
      lat: 35.8344,
      lng: 129.2247,
      type: "관광지",
      congestionByTime: {
        morning: 45,
        afternoon: 75,
        evening: 30,
      },
    },
    {
      id: 3,
      title: "대릉원",
      subtitle: "신라 황릉과 고분군",
      description: "상세 설명이 없습니다.",
      tags: "#유명관광지 #문화재 #유네스코",
      image:
        "https://images.unsplash.com/photo-1534569245809-b2e0b8f2f2c9?w=400&h=300&fit=crop",
      lat: 35.8394,
      lng: 129.2246,
      type: "관광지",
      congestionByTime: {
        morning: 45,
        afternoon: 75,
        evening: 30,
      },
    },
    {
      id: 4,
      title: "첨성대",
      subtitle: "동양 최고의 천문대",
      description: "상세 설명이 없습니다.",
      tags: "#유명관광지 #문화재 #역사",
      image:
        "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
      lat: 35.835,
      lng: 129.2188,
      type: "관광지",
      congestionByTime: {
        morning: 45,
        afternoon: 75,
        evening: 30,
      },
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaceModalOpen, setIsPlaceModalOpen] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(
    null
  );
  const [Modal, setModal] = useState<"추가" | "삭제" | "설명" | "정렬">();

  const axiosTemplateGetData = async () => {
    console.log("let's go", tripId);
    if (!tripId) {
      console.warn("tripId가 존재하지 않습니다.");
      return;
    }

    try {
      const res = await tripPlaceGetApi(tripId);
      console.log("전체 응답:", res);
      console.log("응답 데이터:", res.data);

      if (!res || !res.data) {
        console.warn("응답에 데이터가 없습니다.");
        return;
      }

      let dataArray: any[] = [];

      if (Array.isArray(res.data)) {
        dataArray = res.data;
      } else if (typeof res.data === "object") {
        dataArray = [res.data];
      } else {
        console.warn("예상치 못한 데이터 형식:", res.data);
        return;
      }

      if (dataArray.length === 0) {
        console.warn("데이터가 비어있습니다.");
        setTemplates([]);
        return;
      }

      const apiTemplates: Template[] = dataArray.map((item: any) => ({
        id: item.placeId,
        title: item.name || "이름 없음",
        subtitle: item.address || "주소 없음",
        description: item.description || "상세 설명이 없습니다.",
        tags: item.category ? `#${item.category}` : "#기타",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        lat: item.latitude || 0,
        lng: item.longitude || 0,
        type: (item.category as "음식점" | "관광지" | "숙소") || "관광지",
        congestionByTime: {
          morning: 30,
          afternoon: 50,
          evening: 40,
        },
      }));

      console.log("변환된 템플릿:", apiTemplates);
      setTemplates(apiTemplates);
    } catch (err) {
      console.error("데이터 요청 실패:", err);
    }
  };

  useEffect(() => {
    axiosTemplateGetData();
  }, []);

  // 시간대별 혼잡도 가져오기
  const getCongestionForTime = (
    template: Template,
    timeSlot: string
  ): number => {
    if (!template.congestionByTime) return 0;

    if (timeSlot === "am 6:00 ~ am 11:00")
      return template.congestionByTime.morning;
    if (timeSlot === "am 11:00 ~ pm 5:00")
      return template.congestionByTime.afternoon;
    if (timeSlot === "pm 5:00 ~ pm 10:00")
      return template.congestionByTime.evening;

    return 0;
  };

  // 필터링된 템플릿
  const filteredTemplates = templates.filter((template) => {
    if (template.type !== selectedTab) return false;

    const congestion = getCongestionForTime(template, selectedTime);
    if (congestion > 60) return false;

    return true;
  });

  const handlePlaceClick = (place: Template) => {
    setSelectedPlace(place);
    setIsPlaceModalOpen(true);
  };

  const handleAdd = () => {
    setIsModalOpen(true);
    setModal("추가");
    console.log("Add new template");
  };

  const handleConfirmAdd = async (templateName: string) => {
    if (!templateName.trim()) return;

    try {
      const newPlaceData = {
        name: templateName,
        address: "주소를 입력하세요",
        category: selectedTab,
        latitude: 35.8714,
        longitude: 129.2247,
        description: "상세 설명이 없습니다.",
      };

      const res = await tripPlacePostApi(tripId, templates);
      console.log("장소 추가 성공:", res);

      const newTemplate: Template = {
        id: res.placeId || Date.now(),
        title: templateName,
        subtitle: "주소를 입력하세요",
        description: "상세 설명이 없습니다.",
        tags: `#새템플릿`,
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        lat: 35.8714,
        lng: 129.2247,
        type: selectedTab,
        congestionByTime: {
          morning: 30,
          afternoon: 50,
          evening: 40,
        },
      };

      setTemplates((prev) => [...prev, newTemplate]);
      console.log("Added new template:", newTemplate);
    } catch (error) {
      console.error("장소 추가 실패:", error);
    }
  };

  const handleConfirm = async (inputValue?: string) => {
    if (Modal === "추가") {
      if (inputValue) {
        await handleConfirmAdd(inputValue);
      }
    } else if (Modal === "삭제") {
      if (templateToDelete) {
        try {
          await tripPlaceDelApi(tripId, templateToDelete.id);
          console.log("삭제 성공:", templateToDelete.id);

          setTemplates((prev) =>
            prev.filter((t) => t.id !== templateToDelete.id)
          );
        } catch (error) {
          console.error("삭제 실패:", error);
        }
      }
      setTemplateToDelete(null);
    } else if (Modal === "정렬") {
      console.log("AI 정렬 실행");
    }

    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTemplateToDelete(null);
  };

  const handleClosePlaceModal = () => {
    setIsPlaceModalOpen(false);
    setSelectedPlace(null);
  };

  const handleDel = (id: number) => {
    const template = templates.find((t) => t.id === id);
    setTemplateToDelete(template || null);
    setIsModalOpen(true);
    setModal("삭제");
  };

  const handleAI = async () => {
    setIsModalOpen(true);
    setModal("정렬");
    console.log("AI 정렬 시작");
    try {
      const res = await recommendApi(tripId);
      console.log("AI 정렬 결과:", res);
    } catch (error) {
      console.error("AI 정렬 실패:", error);
    }
  };

  const handlePrevious = () => {
    console.log("Go to previous page");
  };

  const handleReorder = (newTemplates: Template[]) => {
    // 순서가 변경된 템플릿에 순서 번호 추가
    const templatesWithOrder = newTemplates.map((template, index) => ({
      ...template,
      order: index + 1, // 1부터 시작하는 순서 번호
    }));

    setTemplates(templatesWithOrder);
    console.log("순서 변경됨:", templatesWithOrder);
  };

  const handleStart = () => {
    // 다음 페이지로 넘길 때 순서 정보가 포함된 데이터 전달
    const orderedTemplates = templates.map((template, index) => ({
      ...template,
      order: index + 1,
    }));

    console.log("최종 순서가 포함된 데이터:", orderedTemplates);
    // 여기서 API 호출이나 다음 페이지로 데이터 전달
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20 px-6 max-w-7xl mx-auto h-screen pb-12">
        <TemplateTabs
          onClose={handleCloseModal}
          onClickAI={handleAI}
          setIsModalOpen={setIsModalOpen}
          selectedTab={selectedTab}
          onTabChange={setSelectedTab}
          selectedTime={selectedTime}
          onTimeChange={setSelectedTime}
        />

        <TemplateCarousel
          templates={filteredTemplates}
          onAdd={handleAdd}
          handleDel={handleDel}
          onPlaceClick={handlePlaceClick}
          onReorder={handleReorder}
        />

        <NavigationButtons onPrevious={handlePrevious} onStart={handleStart} />
      </div>

      <TeleportDelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        templateTitle={templateToDelete?.title}
        Modal={Modal}
      />

      {selectedPlace && (
        <PlaceDetailModal
          isOpen={isPlaceModalOpen}
          onClose={handleClosePlaceModal}
          placeData={{
            title: selectedPlace.title,
            subtitle: selectedPlace.subtitle,
            description: selectedPlace.description || "상세 설명이 없습니다.",
            image: selectedPlace.image,
            lat: selectedPlace.lat ?? 0, // 기본값 제공
            lng: selectedPlace.lng ?? 0, // 기본값 제공
          }}
        />
      )}
    </div>
  );
}
