// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import dayjs from "dayjs";
// import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

// interface WeatherData { water: number; temp: number; }

// const CITIES = [
//   { name: "Amritsar", lat: 31.634, lon: 74.8723 },
//   { name: "Ludhiana", lat: 30.9, lon: 75.8573 },
//   { name: "Jalandhar", lat: 31.326, lon: 75.5762 },
//   { name: "Patiala", lat: 30.3398, lon: 76.3869 },
//   { name: "Bathinda", lat: 30.211, lon: 74.9455 },
// ];

// const FloodWeatherCard: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [data, setData] = useState<{ yesterday: WeatherData; today: WeatherData; tomorrow: WeatherData } | null>(null);
//   const [dayType, setDayType] = useState<"yesterday" | "today" | "tomorrow">("today");
//   const [waterLevel, setWaterLevel] = useState<number>(0);
//   const [temperature, setTemperature] = useState<number | null>(null);
//   const [precipitation, setPrecipitation] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);

//   const getWaterLevel = (date: string) => 50 + (dayjs(date).unix() % 10) + Math.random();

//   const fetchWeather = async (date: string) => {
//     setLoading(true);
//     try {
//       const temps: number[] = [];
//       const precs: number[] = [];

//       await Promise.all(
//         CITIES.map(async (city) => {
//           const url = `https://archive-api.open-meteo.com/v1/era5?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,precipitation_sum&start_date=${date}&end_date=${date}&timezone=Asia/Kolkata`;
//           const res = await axios.get(url);
//           const daily = res.data.daily;
//           if (daily?.temperature_2m_max && daily?.precipitation_sum) {
//             temps.push(daily.temperature_2m_max[0]);
//             precs.push(daily.precipitation_sum[0]);
//           }
//         })
//       );

//       if (temps.length > 0) setTemperature(temps.reduce((a, b) => a + b, 0) / temps.length);
//       if (precs.length > 0) setPrecipitation(precs.reduce((a, b) => a + b, 0) / precs.length);
//     } catch (err) {
//       console.error(err);
//       setTemperature(null);
//       setPrecipitation(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const dateObj = dayjs();
//     let newDate = dateObj;
//     if (dayType === "yesterday") newDate = dateObj.subtract(1, "day");
//     else if (dayType === "tomorrow") newDate = dateObj.add(1, "day");
//     const finalDate = newDate.format("YYYY-MM-DD");
//     setSelectedDate(finalDate);
//     setWaterLevel(getWaterLevel(finalDate));
//     fetchWeather(finalDate);
//   }, [dayType]);

//   const getWeatherIcon = () => {
//     if (precipitation !== null) {
//       if (precipitation > 5) return <WiRain size={36} />;
//       else if (temperature !== null && temperature < 25) return <WiCloud size={36} />;
//       else return <WiDaySunny size={36} />;
//     }
//     return <WiDaySunny size={36} />;
//   };

//   return (
//     <div className="max-w-sm mx-auto mt-6 relative rounded-xl shadow-xl overflow-hidden">
//       <div
//         className="absolute inset-0 bg-cover bg-center"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
//         }}
//       ></div>
//       <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>

//       <div className="relative p-4 flex flex-col items-center text-white">
//         <h1 className="text-xl font-bold mb-1 drop-shadow-lg text-center">Punjab Flood Status</h1>
//         <p className="text-sm mb-2 drop-shadow-md">{dayjs(selectedDate).format("dddd, MMM D, YYYY")}</p>

//         {loading ? (
//           <p className="text-cyan-400 font-semibold animate-pulse mb-2 text-sm">Loading weather...</p>
//         ) : (
//           <div className="flex flex-col items-center mb-2">
//             {getWeatherIcon()}
//             {temperature !== null && <p className="text-lg mt-1 drop-shadow-md">🌡️ {temperature.toFixed(1)}°C</p>}
//             {precipitation !== null && <p className="text-sm drop-shadow-md">🌧️ {precipitation.toFixed(1)} mm</p>}
//           </div>
//         )}

//         <div className="text-3xl font-extrabold mb-3 drop-shadow-lg">{waterLevel.toFixed(1)} m</div>

//         <div className="flex gap-2 mb-3">
//           {["yesterday", "today", "tomorrow"].map((type) => (
//             <button
//               key={type}
//               onClick={() => setDayType(type as "yesterday" | "today" | "tomorrow")}
//               className={`px-3 py-1 rounded-full font-semibold text-sm transition ${
//                 dayType === type ? "bg-cyan-500 text-white shadow-md" : "bg-white text-gray-800 hover:bg-gray-200"
//               }`}
//             >
//               {type.charAt(0).toUpperCase() + type.slice(1)}
//             </button>
//           ))}
//         </div>

//         <div className="bg-white rounded-lg p-1 w-full flex justify-center">
//           <input
//             type="date"
//             value={selectedDate}
//             max={dayjs().add(1, "day").format("YYYY-MM-DD")}
//             onChange={(e) => {
//               setSelectedDate(e.target.value);
//               setWaterLevel(getWaterLevel(e.target.value));
//               setDayType("today");
//               fetchWeather(e.target.value);
//             }}
//             className="rounded-md p-1 w-full text-sm"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FloodWeatherCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

interface WeatherData {
  water: number;
  temp: number | null;
  precipitation: number | null;
}

const CITIES = [
  { name: "Amritsar", lat: 31.634, lon: 74.8723 },
  { name: "Ludhiana", lat: 30.9, lon: 75.8573 },
  { name: "Jalandhar", lat: 31.326, lon: 75.5762 },
  { name: "Patiala", lat: 30.3398, lon: 76.3869 },
  { name: "Bathinda", lat: 30.211, lon: 74.9455 },
];

const FloodWeatherCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [dayType, setDayType] = useState<"yesterday" | "today" | "tomorrow">("today");
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  const getWaterLevel = (date: string) => 50 + (dayjs(date).unix() % 10) + Math.random();

  const fetchWeather = async (date: string) => {
    setLoading(true);
    try {
      const temps: number[] = [];
      const precs: number[] = [];

      const useArchive = dayjs(date).isBefore(dayjs(), "day"); // past dates use archive

      await Promise.all(
        CITIES.map(async (city) => {
          const url = useArchive
            ? `https://archive-api.open-meteo.com/v1/era5?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,precipitation_sum&start_date=${date}&end_date=${date}&timezone=Asia/Kolkata`
            : `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&daily=temperature_2m_max,precipitation_sum&start_date=${date}&end_date=${date}&timezone=Asia/Kolkata`;

          const res = await axios.get(url);
          const daily = res.data.daily;
          if (daily?.temperature_2m_max?.length) temps.push(daily.temperature_2m_max[0]);
          if (daily?.precipitation_sum?.length) precs.push(daily.precipitation_sum[0]);
        })
      );

      const avgTemp = temps.length ? temps.reduce((a, b) => a + b, 0) / temps.length : null;
      const avgPrecip = precs.length ? precs.reduce((a, b) => a + b, 0) / precs.length : null;

      setData({
        water: getWaterLevel(date),
        temp: avgTemp,
        precipitation: avgPrecip,
      });
    } catch (err) {
      console.error(err);
      setData({
        water: getWaterLevel(date),
        temp: null,
        precipitation: null,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let newDate = dayjs();
    if (dayType === "yesterday") newDate = newDate.subtract(1, "day");
    else if (dayType === "tomorrow") newDate = newDate.add(1, "day");

    const finalDate = newDate.format("YYYY-MM-DD");
    setSelectedDate(finalDate);
    fetchWeather(finalDate);
  }, [dayType]);

  const getWeatherIcon = () => {
    if (!data) return <WiDaySunny size={48} />;
    if (data.precipitation !== null) {
      if (data.precipitation > 5) return <WiRain size={48} />;
      if (data.temp !== null && data.temp < 25) return <WiCloud size={48} />;
      return <WiDaySunny size={48} />;
    }
    return <WiDaySunny size={48} />;
  };

  return (
    <div className="max-w-[700px] mx-auto mt-10 relative rounded-xl shadow-xl overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80')",
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>

      <div className="relative p-6 flex flex-col items-center text-white">
        <h1 className="text-2xl font-bold mb-2 drop-shadow-lg text-center">Punjab Flood Status</h1>
        <p className="text-lg mb-4 drop-shadow-md">{dayjs(selectedDate).format("dddd, MMM D, YYYY")}</p>

        {loading || !data ? (
          <p className="text-cyan-400 font-semibold animate-pulse mb-4">Loading weather...</p>
        ) : (
          <>
            <div className="flex flex-col items-center mb-4">
              {getWeatherIcon()}
              {data.temp !== null && <p className="text-2xl mt-2 drop-shadow-md">🌡️ {data.temp.toFixed(1)}°C</p>}
              {data.precipitation !== null && <p className="text-lg drop-shadow-md">🌧️ {data.precipitation.toFixed(1)} mm</p>}
            </div>
            <div className="text-4xl font-extrabold mb-4 drop-shadow-lg">{data.water.toFixed(1)} m</div>
          </>
        )}

        <div className="flex gap-4 mb-4">
          {(["yesterday", "today", "tomorrow"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setDayType(type)}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                dayType === type ? "bg-cyan-500 text-white shadow-lg" : "bg-white text-gray-800 hover:bg-gray-200"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl p-2 w-full flex justify-center">
          <input
            type="date"
            value={selectedDate}
            max={dayjs().add(1, "day").format("YYYY-MM-DD")}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              fetchWeather(e.target.value);
              setDayType("today");
            }}
            className="rounded-lg p-2 w-full border text-md text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default FloodWeatherCard;
