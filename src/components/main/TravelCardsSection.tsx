import { travelCards } from "../../data/travelCards";

export default function TravelCardsSection() {
  // 카드를 2번 복제하여 무한 루프 효과
  const duplicatedCards = [...travelCards, ...travelCards];

  return (
    <section
      id="four"
      className="h-screen flex flex-col justify-center bg-gray-50 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-black mb-12 ml-16">추천 여행지</h2>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full">
        <div className="flex gap-6 animate-scroll">
          {duplicatedCards.map((card, idx) => (
            <div
              key={idx}
              className="min-w-[320px] bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow flex-shrink-0"
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-black mb-3 whitespace-pre-line">
                  {card.title}
                </h3>
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 flex-wrap">
                    {card.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="text-xs text-gray-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="text-gray-400 text-sm font-semibold hover:text-gray-600 whitespace-nowrap">
                    보러가기
                  </button>
                </div>
              </div>
              <div className="relative h-48">
                <img
                  src={card.image}
                  alt="여행지"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
