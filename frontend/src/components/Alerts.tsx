// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { Line } from "react-chartjs-2";
// // import dayjs from "dayjs";
// // import {
// //   Chart as ChartJS,
// //   CategoryScale,
// //   LinearScale,
// //   PointElement,
// //   LineElement,
// //   Title,
// //   Tooltip,
// //   Legend,
// // } from "chart.js";

// // // Type-only imports
// // import type { ChartDataset, ChartOptions } from "chart.js";

// // ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


// // // Cities in Punjab
// // const CITIES = [
// //   { name: "Amritsar", lat: 31.634, lon: 74.8723 },
// //   { name: "Ludhiana", lat: 30.9, lon: 75.8573 },
// //   { name: "Jalandhar", lat: 31.326, lon: 75.5762 },
// //   { name: "Patiala", lat: 30.3398, lon: 76.3869 },
// //   { name: "Bathinda", lat: 30.211, lon: 74.9455 },
// // ];

// // const START_DATE = "2023-09-24";
// // const END_DATE = "2025-09-23";

// // const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

// // // Helper to build Open-Meteo ERA5 API URL
// // const buildUrl = (lat: number, lon: number, start: string, end: string) => {
// //   const base = "https://archive-api.open-meteo.com/v1/era5";
// //   const params = new URLSearchParams({
// //     latitude: String(lat),
// //     longitude: String(lon),
// //     daily: "precipitation_sum",
// //     start_date: start,
// //     end_date: end,
// //     timezone: "Asia/Kolkata",
// //   });
// //   return `${base}?${params.toString()}`;
// // };

// // // Aggregate daily data into monthly totals
// // const dailyToMonthly = (dates: string[], values: number[]) => {
// //   const map = new Map<string, number>();
// //   for (let i = 0; i < dates.length; i++) {
// //     const m = dayjs(dates[i]).format("YYYY-MM");
// //     map.set(m, (map.get(m) || 0) + (values[i] || 0));
// //   }
// //   const months = Array.from(map.keys()).sort();
// //   const totals = months.map((m) => map.get(m) || 0);
// //   return { months, totals };
// // };

// // // Thresholds for precipitation (mm)
// // const PRECIP_NORMAL = 0;      // below this is very low
// // const PRECIP_WARNING = 150;   // warning zone
// // const PRECIP_DANGER = 250;    // danger zone

// // const Alerts: React.FC = () => {
// //   const [loading, setLoading] = useState(false);
// //   const [chartData, setChartData] = useState<{ labels: string[]; datasets: ChartDataset<"line">[] } | null>(
// //     null
// //   );
// //   const [summary, setSummary] = useState<string | null>(null);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       setLoading(true);
// //       setError(null);

// //       try {
// //         const cityMonthly: Record<string, { months: string[]; totals: number[] }> = {};

// //         for (const city of CITIES) {
// //           const url = buildUrl(city.lat, city.lon, START_DATE, END_DATE);
// //           const res = await axios.get(url);
// //           const daily = res.data?.daily;
// //           if (!daily || !daily.time || !daily.precipitation_sum)
// //             throw new Error(`No daily precipitation returned for ${city.name}`);

// //           const { months, totals } = dailyToMonthly(daily.time, daily.precipitation_sum);
// //           cityMonthly[city.name] = { months, totals };
// //         }

// //         const allMonthsSet = new Set<string>();
// //         Object.values(cityMonthly).forEach((c) => c.months.forEach((m) => allMonthsSet.add(m)));
// //         const allMonths = Array.from(allMonthsSet).sort();

// //         // Build datasets
// //         const datasets: ChartDataset<"line">[] = Object.entries(cityMonthly).map(([cityName, data], idx) => {
// //           const monthIndex = new Map(data.months.map((m, i) => [m, i]));
// //           const aligned = allMonths.map((m) => (monthIndex.has(m) ? data.totals[monthIndex.get(m)!] : 0));
// //           return {
// //             label: cityName,
// //             data: aligned,
// //             borderColor: COLORS[idx % COLORS.length],
// //             backgroundColor: COLORS[idx % COLORS.length],
// //             tension: 0.2,
// //             fill: false,
// //           } as ChartDataset<"line">;
// //         });

// //         // Punjab average
// //         const stateTotals = new Array(allMonths.length).fill(0);
// //         datasets.forEach((ds) => ds.data.forEach((v: any, i: any) => (stateTotals[i] += v)));
// //         const stateAvg = stateTotals.map((v) => v / CITIES.length);

// //         datasets.push({
// //           label: "Punjab Avg",
// //           data: stateAvg,
// //           borderColor: "#000000",
// //           backgroundColor: "#000000",
// //           borderDash: [5, 5],
// //           tension: 0.2,
// //           fill: false,
// //         } as ChartDataset<"line">);

// //         // Mock daily water levels (replace with real API)
// //         const dailyWaterLevels = allMonths.map(() => Math.random() * 10 + 50); // 50–60 m
// //         datasets.push({
// //           label: "Water Level (m)",
// //           data: dailyWaterLevels,
// //           borderColor: "#2563EB",
// //           backgroundColor: "#2563EB",
// //           yAxisID: "y1",
// //           tension: 0.2,
// //           fill: false,
// //         } as ChartDataset<"line">);

// //         setChartData({ labels: allMonths, datasets });

// //         const maxIdx = stateAvg.reduce((best, cur, i) => (cur > stateAvg[best] ? i : best), 0);
// //         setSummary(`Peak precipitation month: ${allMonths[maxIdx]} with Punjab-average ${stateAvg[maxIdx].toFixed(1)} mm.`);
// //       } catch (err: any) {
// //         console.error(err);
// //         setError(err.message || String(err));
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const options: ChartOptions<"line"> = {
// //     responsive: true,
// //     interaction: { mode: "index", intersect: false },
// //     plugins: {
// //       title: { display: true, text: "Monthly Precipitation & Water Levels", font: { size: 18 } },
// //       legend: { position: "bottom" },
// //     },
// //     scales: {
// //       y: {
// //         type: "linear",
// //         display: true,
// //         position: "left",
// //         title: { display: true, text: "Precipitation (mm)" },
// //       },
// //       y1: {
// //         type: "linear",
// //         display: true,
// //         position: "right",
// //         title: { display: true, text: "Water Level (m)" },
// //         grid: { drawOnChartArea: false },
// //       },
// //       x: { title: { display: true, text: "Month (YYYY-MM)" } },
// //     },
// //   };

// //   return (
// //     <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
// //       <div className="bg-white p-6 rounded-xl shadow-md">
// //         <h1 className="text-2xl font-bold mb-4 text-gray-800">Punjab Flood Analysis</h1>
// //         <p className="mb-4 text-gray-600">
// //           Date range: {START_DATE} → {END_DATE}. Shows monthly precipitation and daily water level.
// //         </p>
// //         {loading && <div className="text-gray-500">Loading data...</div>}
// //         {error && <div className="text-red-600">Error: {error}</div>}
// //         {chartData && <Line data={chartData} options={options} />}
// //         {summary && <div className="mt-4 text-gray-700 font-medium">{summary}</div>}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Alerts;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import dayjs from "dayjs";
// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     PointElement,
//     LineElement,
//     Title,
//     Tooltip,
//     Legend,
// } from "chart.js";

// // Type-only imports for TS
// import type { ChartDataset, ChartOptions } from "chart.js";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const CITIES = [
//     { name: "Amritsar", lat: 31.634, lon: 74.8723 },
//     { name: "Ludhiana", lat: 30.9, lon: 75.8573 },
//     { name: "Jalandhar", lat: 31.326, lon: 75.5762 },
//     { name: "Patiala", lat: 30.3398, lon: 76.3869 },
//     { name: "Bathinda", lat: 30.211, lon: 74.9455 },
// ];

// const START_DATE = "2023-09-24";
// const END_DATE = "2025-09-23";

// const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];

// const buildUrl = (lat: number, lon: number, start: string, end: string) => {
//     const base = "https://archive-api.open-meteo.com/v1/era5";
//     const params = new URLSearchParams({
//         latitude: String(lat),
//         longitude: String(lon),
//         daily: "precipitation_sum",
//         start_date: start,
//         end_date: end,
//         timezone: "Asia/Kolkata",
//     });
//     return `${base}?${params.toString()}`;
// };

// const dailyToMonthly = (dates: string[], values: number[]) => {
//     const map = new Map<string, number>();
//     for (let i = 0; i < dates.length; i++) {
//         const m = dayjs(dates[i]).format("YYYY-MM");
//         map.set(m, (map.get(m) || 0) + (values[i] || 0));
//     }
//     const months = Array.from(map.keys()).sort();
//     const totals = months.map((m) => map.get(m) || 0);
//     return { months, totals };
// };

// // Thresholds for precipitation (mm)
// const PRECIP_NORMAL = 0;      // below this is very low
// const PRECIP_WARNING = 150;   // warning zone
// const PRECIP_DANGER = 250;    // danger zone

// const FloodAnalysis: React.FC = () => {
//     const [loading, setLoading] = useState(false);
//     const [chartData, setChartData] = useState<{ labels: string[]; datasets: ChartDataset<"line">[] } | null>(
//         null
//     );
//     const [summary, setSummary] = useState<string | null>(null);
//     const [zones, setZones] = useState<{ month: string; avg: number; zone: string }[]>([]);
//     const [error, setError] = useState<string | null>(null);
    

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             setError(null);

//             try {
//                 const cityMonthly: Record<string, { months: string[]; totals: number[] }> = {};

//                 for (const city of CITIES) {
//                     const url = buildUrl(city.lat, city.lon, START_DATE, END_DATE);
//                     const res = await axios.get(url);
//                     const daily = res.data?.daily;
//                     if (!daily || !daily.time || !daily.precipitation_sum)
//                         throw new Error(`No daily precipitation returned for ${city.name}`);

//                     const { months, totals } = dailyToMonthly(daily.time, daily.precipitation_sum);
//                     cityMonthly[city.name] = { months, totals };
//                 }

//                 const allMonthsSet = new Set<string>();
//                 Object.values(cityMonthly).forEach((c) => c.months.forEach((m) => allMonthsSet.add(m)));
//                 const allMonths = Array.from(allMonthsSet).sort();

//                 // Build datasets
//                 const datasets: ChartDataset<"line">[] = Object.entries(cityMonthly).map(([cityName, data], idx) => {
//                     const monthIndex = new Map(data.months.map((m, i) => [m, i]));
//                     const aligned = allMonths.map((m) => (monthIndex.has(m) ? data.totals[monthIndex.get(m)!] : 0));
//                     return {
//                         label: cityName,
//                         data: aligned,
//                         borderColor: COLORS[idx % COLORS.length],
//                         backgroundColor: COLORS[idx % COLORS.length],
//                         tension: 0.2,
//                         fill: false,
//                     } as ChartDataset<"line">;
//                 });

//                 // Punjab average
//                 const stateTotals = new Array(allMonths.length).fill(0);
//                 datasets.forEach((ds) => ds.data.forEach((v: any, i: any) => (stateTotals[i] += v)));
//                 const stateAvg = stateTotals.map((v) => v / CITIES.length);

//                 datasets.push({
//                     label: "Punjab Avg",
//                     data: stateAvg,
//                     borderColor: "#000000",
//                     backgroundColor: "#000000",
//                     borderDash: [5, 5],
//                     tension: 0.2,
//                     fill: false,
//                 } as ChartDataset<"line">);

//                 // Mock daily water levels (replace with real API)
//                 const dailyWaterLevels = allMonths.map(() => Math.random() * 10 + 50); // 50–60 m
//                 datasets.push({
//                     label: "Water Level (m)",
//                     data: dailyWaterLevels,
//                     borderColor: "#2563EB",
//                     backgroundColor: "#2563EB",
//                     yAxisID: "y1",
//                     tension: 0.2,
//                     fill: false,
//                 } as ChartDataset<"line">);

//                 setChartData({ labels: allMonths, datasets });

//                 // Analyze zones
//                 const zoneData = allMonths.map((month, i) => {
//                     const avg = stateAvg[i];
//                     let zone = "Normal";
//                     if (avg >= PRECIP_DANGER) zone = "Danger";
//                     else if (avg >= PRECIP_WARNING) zone = "Warning";
//                     return { month, avg, zone };
//                 });

//                 setZones(zoneData);

//                 const maxIdx = stateAvg.reduce((best, cur, i) => (cur > stateAvg[best] ? i : best), 0);
//                 setSummary(`Peak precipitation month: ${allMonths[maxIdx]} with Punjab-average ${stateAvg[maxIdx].toFixed(1)} mm.`);
//             } catch (err: any) {
//                 console.error(err);
//                 setError(err.message || String(err));
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchData();
//     }, []);

//     const options: ChartOptions<"line"> = {
//         responsive: true,
//         interaction: { mode: "index", intersect: false },
//         plugins: {
//             title: { display: true, text: "Monthly Precipitation & Water Levels", font: { size: 18 } },
//             legend: { position: "bottom" },
//         },
//         scales: {
//             y: { type: "linear", display: true, position: "left", title: { display: true, text: "Precipitation (mm)" } },
//             y1: { type: "linear", display: true, position: "right", title: { display: true, text: "Water Level (m)" }, grid: { drawOnChartArea: false } },
//             x: { title: { display: true, text: "Month (YYYY-MM)" } },
//         },
//     };

//     return (
//         <div className="p-6 max-w-6xl mx-auto bg-gray-50 min-h-screen">
//             {chartData && (
//                 <div className="mb-6">
//                     <h2 className="text-xl font-semibold text-gray-800 mb-2">Daily Water Level in Punjab</h2>
//                     <Line
//                         data={{
//                             labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
//                             datasets: [
//                                 {
//                                     label: "Water Level (m)",
//                                     data: dailyPunjabWaterLevel(),
//                                     borderColor: "#2563EB",
//                                     backgroundColor: "#2563EB",
//                                     tension: 0.2,
//                                     fill: false,
//                                 },
//                             ],
//                         }}
//                         options={{
//                             responsive: true,
//                             plugins: { legend: { position: "bottom" } },
//                             scales: {
//                                 y: { title: { display: true, text: "Water Level (m)" } },
//                                 x: { title: { display: true, text: "Day" } },
//                             },
//                         }}
//                     />
//                 </div>
//             )}

//             <div className="bg-white p-6 rounded-xl shadow-md">
//                 <h1 className="text-2xl font-bold mb-4 text-gray-800">Punjab Flood Analysis</h1>
//                 <p className="mb-4 text-gray-600">
//                     Date range: {START_DATE} → {END_DATE}. Shows monthly precipitation, water levels, and risk zones.
//                 </p>

//                 {loading && (
//                     <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-40">
//                         <div className="flex flex-col items-center">
//                             <div className="w-16 h-16 border-4 border-t-cyan-400 border-gray-700 rounded-full animate-spin"></div>
//                             <p className="mt-4 text-cyan-400 text-lg font-semibold drop-shadow-[0_0_10px_#06b6d4]">Loading...</p>
//                         </div>
//                     </div>
//                 )}

//                 {error && <div className="text-red-600">Error: {error}</div>}

//                 {chartData && <Line data={chartData} options={options} />}

//                 {summary && <div className="mt-4 text-gray-700 font-medium">{summary}</div>}

//                 {zones.length > 0 && (
//                     <div className="mt-6">
//                         <h2 className="text-lg font-semibold mb-2 text-gray-800">Risk Zones:</h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
//                             {zones.map((z) => (
//                                 <div
//                                     key={z.month}
//                                     className={`p-2 rounded text-white font-medium ${z.zone === "Danger" ? "bg-red-600" : z.zone === "Warning" ? "bg-yellow-500" : "bg-green-500"
//                                         }`}
//                                 >
//                                     {z.month}: {z.zone} ({z.avg.toFixed(0)} mm)
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default FloodAnalysis;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import FloodWeatherCard from "./FloodCard";
import dayjs from "dayjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import type { ChartDataset, ChartOptions } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CITIES = [
  { name: "Amritsar", lat: 31.634, lon: 74.8723 },
  { name: "Ludhiana", lat: 30.9, lon: 75.8573 },
  { name: "Jalandhar", lat: 31.326, lon: 75.5762 },
  { name: "Patiala", lat: 30.3398, lon: 76.3869 },
  { name: "Bathinda", lat: 30.211, lon: 74.9455 },
];

const START_DATE = "2023-09-24";
const END_DATE = "2025-09-23";
const COLORS = ["#EF4444", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6"];
const PRECIP_NORMAL = 0;
const PRECIP_WARNING = 150;
const PRECIP_DANGER = 250;

const buildUrl = (lat: number, lon: number, start: string, end: string) => {
  const base = "https://archive-api.open-meteo.com/v1/era5";
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    daily: "precipitation_sum",
    start_date: start,
    end_date: end,
    timezone: "Asia/Kolkata",
  });
  return `${base}?${params.toString()}`;
};

const dailyToMonthly = (dates: string[], values: number[]) => {
  const map = new Map<string, number>();
  for (let i = 0; i < dates.length; i++) {
    const m = dayjs(dates[i]).format("YYYY-MM");
    map.set(m, (map.get(m) || 0) + (values[i] || 0));
  }
  const months = Array.from(map.keys()).sort();
  const totals = months.map((m) => map.get(m) || 0);
  return { months, totals };
};

const FloodAnalysis: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: ChartDataset<"line">[] } | null>(null);
  const [waterLevels, setWaterLevels] = useState<{ yesterday: number; today: number; tomorrow: number } | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [zones, setZones] = useState<{ month: string; avg: number; zone: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const cityMonthly: Record<string, { months: string[]; totals: number[] }> = {};

        for (const city of CITIES) {
          const url = buildUrl(city.lat, city.lon, START_DATE, END_DATE);
          const res = await axios.get(url);
          const daily = res.data?.daily;
          if (!daily || !daily.time || !daily.precipitation_sum)
            throw new Error(`No daily precipitation returned for ${city.name}`);

          const { months, totals } = dailyToMonthly(daily.time, daily.precipitation_sum);
          cityMonthly[city.name] = { months, totals };
        }

        const allMonthsSet = new Set<string>();
        Object.values(cityMonthly).forEach((c) => c.months.forEach((m) => allMonthsSet.add(m)));
        const allMonths = Array.from(allMonthsSet).sort();

        const stateTotals = new Array(allMonths.length).fill(0);
        Object.values(cityMonthly).forEach((data) => data.totals.forEach((v, i) => (stateTotals[i] += v)));
        const stateAvg = stateTotals.map((v) => v / CITIES.length);

        // ---- Mock yesterday, today, tomorrow water levels ----
        const yesterday = Math.random() * 10 + 50;
        const today = yesterday + (Math.random() * 2 - 1); // small variation
        const tomorrow = today + (Math.random() * 2 - 1);

        setWaterLevels({ yesterday, today, tomorrow });

        // Chart datasets
        const datasets: ChartDataset<"line">[] = Object.entries(cityMonthly).map(([cityName, data], idx) => {
          const monthIndex = new Map(data.months.map((m, i) => [m, i]));
          const aligned = allMonths.map((m) => (monthIndex.has(m) ? data.totals[monthIndex.get(m)!] : 0));
          return {
            label: cityName,
            data: aligned,
            borderColor: COLORS[idx % COLORS.length],
            backgroundColor: COLORS[idx % COLORS.length],
            tension: 0.2,
            fill: false,
          } as ChartDataset<"line">;
        });

        datasets.push({
          label: "Punjab Avg",
          data: stateAvg,
          borderColor: "#000000",
          backgroundColor: "#000000",
          borderDash: [5, 5],
          tension: 0.2,
          fill: false,
        });

        const monthlyWaterLevels = allMonths.map(() => Math.random() * 10 + 50);
        datasets.push({
          label: "Water Level (m)",
          data: monthlyWaterLevels,
          borderColor: "#2563EB",
          backgroundColor: "#2563EB",
          yAxisID: "y1",
          tension: 0.2,
          fill: false,
        });

        setChartData({ labels: allMonths, datasets });

        const zoneData = allMonths.map((month, i) => {
          const avg = stateAvg[i];
          let zone = "Normal";
          if (avg >= PRECIP_DANGER) zone = "Danger";
          else if (avg >= PRECIP_WARNING) zone = "Warning";
          return { month, avg, zone };
        });
        setZones(zoneData);

        const maxIdx = stateAvg.reduce((best, cur, i) => (cur > stateAvg[best] ? i : best), 0);
        setSummary(`Peak precipitation month: ${allMonths[maxIdx]} with Punjab-average ${stateAvg[maxIdx].toFixed(1)} mm.`);
      } catch (err: any) {
        console.error(err);
        setError(err.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: { mode: "index", intersect: false },
    plugins: {
      title: { display: true, text: "Monthly Precipitation & Water Levels", font: { size: 18 } },
      legend: { position: "bottom" },
    },
    scales: {
      y: { type: "linear", display: true, position: "left", title: { display: true, text: "Precipitation (mm)" } },
      y1: { type: "linear", display: true, position: "right", title: { display: true, text: "Water Level (m)" }, grid: { drawOnChartArea: false } },
      x: { title: { display: true, text: "Month (YYYY-MM)" } },
    },
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gray-500 min-h-screen">
      {/* Water Level Card */}
      {/* {waterLevels && (
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {["yesterday", "today", "tomorrow"].map((key) => (
            <div key={key} className="bg-blue-600 text-white p-4 rounded-xl shadow-md flex flex-col items-center">
              <h2 className="text-lg font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</h2>
              <p className="text-2xl font-bold">{waterLevels[key as keyof typeof waterLevels].toFixed(1)} m</p>
              <p className="text-sm text-white/70">
                {key === "yesterday"
                  ? dayjs().subtract(1, "day").format("YYYY-MM-DD")
                  : key === "today"
                  ? dayjs().format("YYYY-MM-DD")
                  : dayjs().add(1, "day").format("YYYY-MM-DD")}
              </p>
            </div>
          ))}
        </div>
      )} */}
      <FloodWeatherCard/>

      {/* Monthly Chart & Risk Zones */}
      <div className="bg-gray-200 mt-5 p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Punjab Flood Analysis</h1>
        <p className="mb-4 text-gray-600">
          Date range: {START_DATE} → {END_DATE}. Shows monthly precipitation, water levels, and risk zones.
        </p>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-70 z-40">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-t-cyan-400 border-gray-700 rounded-full animate-spin"></div>
              <p className="mt-4 text-cyan-400 text-lg font-semibold drop-shadow-[0_0_10px_#06b6d4]">Loading...</p>
            </div>
          </div>
        )}

        {error && <div className="text-red-600">Error: {error}</div>}

        {chartData && <Line data={chartData} options={options} />}

        {summary && <div className="mt-4 text-gray-700 font-medium">{summary}</div>}

        {zones.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Risk Zones:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {zones.map((z) => (
                <div
                  key={z.month}
                  className={`p-2 rounded text-white font-medium ${
                    z.zone === "Danger"
                      ? "bg-red-600"
                      : z.zone === "Warning"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                >
                  {z.month}: {z.zone} ({z.avg.toFixed(0)} mm)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloodAnalysis;
