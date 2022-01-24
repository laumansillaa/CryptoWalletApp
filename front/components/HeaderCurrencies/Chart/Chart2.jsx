import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph
} from 'react-native-chart-kit'
import { View,Text } from 'react-native';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';


export default function Chart2() {
const chartInfo = useSelector(state=> state.monthPrices);
const date15 = new Date().getDate();
const date3 = Math.round(date15/2);
const date2 = Math.round(date3/2);
const date4 = Math.round(date2*3);
const lastMonth = new Date().getMonth() === 0 ? 12 : new Date().getMonth();
const month = lastMonth === 12 ? 1 : lastMonth + 1;

    if(chartInfo[0] < chartInfo[chartInfo.length -1]) {
        return (  
            <LineChart
                data={{
                    labels: [`${date15}/${lastMonth}`, `${date2}/${month}`, `${date3}/${month}`, `${date4}/${month}`, `${date15}/${month}`],
                    datasets: [{
                        data: chartInfo
                    }]
                }}
                width={Dimensions.get('window').width -10} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                withVerticalLines={0}
                withHorizontalLines={1}
                withVerticalLabels={1}
                withHorizontalLabels={1}
                chartConfig={{
                    backgroundColor: "#000000",
                    backgroundGradientFrom: "#000000",
                    backgroundGradientTo: "#0f0f0f",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 255, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "0"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        );
    } else {
        return (  
            <LineChart
                data={{
                    labels: [`${date15}/${lastMonth}`, `${date2}/${month}`, `${date3}/${month}`, `${date4}/${month}`, `${date15}/${month}`],
                    datasets: [{
                        data: chartInfo
                    }]
                }}
                width={Dimensions.get('window').width -10} // from react-native
                height={220}
                yAxisInterval={1} // optional, defaults to 1
                withVerticalLines={0}
                withHorizontalLines={1}
                withVerticalLabels={1}
                withHorizontalLabels={1}
                chartConfig={{
                    backgroundColor: "#000000",
                    backgroundGradientFrom: "#000000",
                    backgroundGradientTo: "#0f0f0f",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "0"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        );
    }

    
}

// import * as React from 'react';

// import { AreaChart, Grid, } from 'react-native-svg-charts'
// import * as shape from 'd3-shape'
// import { useDispatch, useSelector } from 'react-redux';
 


// export default function Chart2() {
//     const chartInfo = useSelector(state=> state.monthPrices);

//     const data = chartInfo





//     return (
//       <> 
//     <AreaChart
//                 style={{ height: 200 }}
//                 data={data}
//                 contentInset={{ top: 30, bottom: 30 }}
//                 curve={shape.curveBasisOpen}
//                 svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
//                 animate={true}
//                 animationDuration={800}
//             >
          
                
//             </AreaChart>

//      </>
  
 
//   );
// }
