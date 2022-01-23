import React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Dimensions} from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function SegmentChartGrandient() {
    const chartInfo = useSelector(state=> state.monthPrices);
    return (
      
            <LineChart
                data={{
                    labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
                    datasets: [
                        {
                        data: chartInfo
                        }
                    ]
                }}
                width={Dimensions.get("window").width} // from react-native
                height={220}
               /*  yAxisLabel="$" */
                //yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                withVerticalLines={0}
                withHorizontalLines={1}
                withVerticalLabels={0}
                withHorizontalLabels={1}
                chartConfig={{
                    //fillShadowGradient: "#white",
                    //backgroundColor: "#black",
                    //backgroundGradientFrom: "#black",
                    //backgroundGradientTo: "#black",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "0",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                    }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
       
    )
}







// import { useEffect, useRef, useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import { useDispatch, useSelector } from 'react-redux';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );


// const options = {
//     fill: true,
//     responsive: true,
//     scales: {
//         y: {
//             min: 0,
//             display:false
//         },
//         x: {
//             display:false
//         }
//     },
//     plugins: {
//         legend: {
//         display: false,
//         },
//     },
// };

// export default function SegmentChartGrandient() {
//     const chartInfo = useSelector(state=> state.monthPrices);
//     const scores = chartInfo;
//     const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];

//     const chartRef = useRef(null);
//     const [chartData, setChartData] = useState({
//         datasets: [],
//     });
    

//     useEffect(function () {
//         const chart = chartRef.current;
//         if (!chart) {
//         return;
//         }

//         function createGradientColor(color) {
//         const ctx = chart.ctx;
//         const gradient = ctx.createLinearGradient(0, 0, 0, 175);
//         gradient.addColorStop(0, color);
//         gradient.addColorStop(0.99, "rgba(255,255,255,0.6)");
//         gradient.addColorStop(1, "rgba(255,255,255,0.6)");
//         return gradient;
//         }
        
//         if(chartInfo[0] < chartInfo[chartInfo.length -1]) {
//             setChartData({
//                 datasets: [
//                     {
//                     label: "CRYPTO-CHART",
//                     data: scores,
//                     tension: 0.3,
//                     borderColor: "green",
//                     pointRadius: 0,
//                     backgroundColor: () => createGradientColor("green"),
//                     },
//                 ],
//                 labels,
//             });
//         } else {
//             setChartData({
//                 datasets: [
//                     {
//                     label: "CRYPTO-CHART",
//                     data: scores,
//                     tension: 0.3,
//                     borderColor: "red",
//                     pointRadius: 0,
//                     backgroundColor: () => createGradientColor("red"),
//                     },
//                 ],
//                 labels,
//             });
//         }
//     }, [chartInfo]);

//   return <Line data={chartData} options={options} ref={chartRef} />;
// }