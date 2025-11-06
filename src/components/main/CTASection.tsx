export default function CTASection() {
  return (
    <section
      id="five"
      className="h-screen flex justify-center items-center bg-gradient-to-b from-white to-gray-50 pt-5"
    >
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold text-black mb-10">
          당장 어디론가 떠나고싶다면?
        </h1>
        <button className="bg-[#0084FF] hover:bg-blue-600 text-white text-2xl font-bold px-8 py-3 rounded-lg transition-colors duration-200">
          시작
        </button>
      </div>
    </section>
  );
}
