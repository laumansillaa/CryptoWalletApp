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
  return (
    <> 
     
  <LineChart
    data={{
      labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      datasets: [{
        data: chartInfo
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={220}
    chartConfig={{
      
      backgroundColor: '#e26a00',
      backgroundGradientFrom: '#1E2923',
      backgroundGradientTo: '#08130D',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 50) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />


         
   </>


);
}

/* import * as React from 'react';

import { AreaChart, Grid, } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { useDispatch, useSelector } from 'react-redux';
import { PresenceTransition } from 'native-base';
 


export default function Chart2() {
    const chartInfo = useSelector(state=> state.monthPrices);

    const data = chartInfo





    return (
      <> 
       
    <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveBasisOpen}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                animate={true}
                animationDuration={500}
            >
          
                
            </AreaChart>
           
     </>
  
 
  );
} */
