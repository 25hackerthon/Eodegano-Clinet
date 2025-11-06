export default function PlaceChart() {
  const chartData = [
    { time: "09시", value: 30 },
    { time: "10시", value: 45 },
    { time: "11시", value: 60 },
    { time: "12시", value: 80 },
    { time: "13시", value: 75 },
    { time: "14시", value: 65 },
    { time: "15시", value: 70 },
    { time: "16시", value: 85 },
    { time: "17시", value: 90 },
    { time: "18시", value: 70 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="space-y-2">
      <h4 className="text-lg font-bold text-gray-900">혼잡도</h4>
      <div className="w-full h-48 bg-gradient-to-b from-blue-50 to-white rounded-xl p-4">
        <div className="flex items-end justify-between h-full gap-1">
          {chartData.map((data, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div className="w-full flex items-end justify-center h-32">
                <div
                  className="w-full bg-blue-400 rounded-t transition-all hover:bg-blue-500"
                  style={{
                    height: `${(data.value / maxValue) * 100}%`,
                    minHeight: "8px",
                  }}
                />
              </div>
              <span className="text-xs text-gray-500">{data.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
