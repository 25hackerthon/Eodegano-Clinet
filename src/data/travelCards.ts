export interface TravelCard {
  image: string;
  title: string;
  tags: string[];
}

export const travelCards: TravelCard[] = [
  {
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?w=600&h=400&fit=crop",
    title: "혼자만의\n시간을 보낼 수 있는 곳",
    tags: ["#나혼자산다", "#문화생활", "#후식"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1464730044785-b9e6a3f8ddf5?w=600&h=400&fit=crop",
    title: "자연 속에서\n힐링하는 여행",
    tags: ["#힐링", "#자연", "#캠핑"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=600&h=400&fit=crop",
    title: "도시의 감성을\n느낄 수 있는 곳",
    tags: ["#도심", "#카페투어", "#감성"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    title: "산과 바다를\n함께 즐기는 여행",
    tags: ["#산", "#바다", "#힐링"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=400&fit=crop",
    title: "역사와 문화가\n살아있는 곳",
    tags: ["#역사", "#문화", "#전통"],
  },
  {
    image:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&h=400&fit=crop",
    title: "액티비티를\n즐기는 여행",
    tags: ["#액티비티", "#스포츠", "#모험"],
  },
];
