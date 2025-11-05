import UseForm from "../../assets/use-form.svg";
import PlaceRecommend from "../../assets/place-recommend.svg";
import MyPath from "../../assets/MyPath.svg";

export default function FeaturesSection() {
  return (
    <section
      id="second"
      className="h-screen flex justify-center items-center text-white pt-5"
    >
      <div className="flex justify-center items-center flex-col">
        <img src={UseForm} className="w-[60%]" />
        <h1 className="text-lg font-bold text-black my-2">사용자 정보 입력</h1>
        <p className="font-bold text-gray-400 text-center">
          여행 컨셉, 인원, 날짜, 지역, 교통수단을 <br />
          입력하고 정확한 일정을 만드세요.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <img src={PlaceRecommend} className="w-[60%]" />
        <h1 className="text-lg font-bold text-black my-2">관광지 추천</h1>
        <p className="font-bold text-gray-400 text-center">
          입력받은 정보를 기반으로 AI가 <br />
          사용자에게 맞춤형 관광지를 추천해줍니다.
        </p>
      </div>
      <div className="flex justify-center items-center flex-col">
        <img src={MyPath} className="w-[60%]" />
        <p className="text-lg font-bold text-black my-2">사용자만의 로드맵</p>
        <p className="font-bold text-gray-400 text-center">
          AI가 추천해준 관광지를 선택하고,
          <br />
          사용자님만의 로드맵을 완성해세요!
        </p>
      </div>
    </section>
  );
}
