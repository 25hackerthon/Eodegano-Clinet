export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-50 pt-5"
    >
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-black mb-4">여행 일정 관리.</h1>
        <p className="text-4xl font-bold text-gray-400 mb-8">
          여행 계획을 쉽고 빠르게 구성하세요.
        </p>
        <button className="bg-[#0084FF] hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200">
          시작
        </button>
      </div>
    </section>
  );
}
