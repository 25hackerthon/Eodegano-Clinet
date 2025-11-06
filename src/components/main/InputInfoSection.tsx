import dateIcon from "../../assets/date_icon.svg"
import localIcon from "../../assets/local_icon.svg";
import carIcon from "../../assets/car_icon.svg";
import routeIcon from "../../assets/route_icon.svg";

export default function InputInfoSection() {
  return (
    <section
      id="three"
      className="h-screen flex justify-center flex-col px-8 gap-[10%]"
    >
      <h2 className="text-2xl font-bold text-black ml-[12%]">입력 정보</h2>
      <div className="w-full flex justify-around items-start px-12">
        <div className="flex flex-col items-center">
          <img src={dateIcon} className="w-20 h-20 mb-4" />
          <p className="text-black font-semibold">날짜 지정</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={localIcon} className="w-20 h-20 mb-4" />
          <p className="text-black font-semibold">지역 선택</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={carIcon} className="w-20 h-20 mb-4" />
          <p className="text-black font-semibold">교통수단</p>
        </div>
        <div className="flex flex-col items-center">
          <img src={routeIcon} className="w-20 h-20 mb-4" />
          <p className="text-black font-semibold">경로 시각화</p>
        </div>
      </div>
    </section>
  );
}
