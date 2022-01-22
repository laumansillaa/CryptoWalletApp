import * as React from 'react';

import { AreaChart, Grid, } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { useDispatch, useSelector } from 'react-redux';
import { PresenceTransition } from 'native-base';
 


export default function Chart2() {
    const chartInfo = useSelector(state=> state.monthPrices);

    const data = chartInfo





    return (
      <> 
       <PresenceTransition
         visible= {true}
         initial={{
           opacity: 0,
         }}
         animate={{
           opacity: 1,
           transition: {
             duration: 600,
           },
         }}
       >
    <AreaChart
                style={{ height: 200 }}
                data={data}
                contentInset={{ top: 30, bottom: 30 }}
                curve={shape.curveBasisOpen}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
               animate={true}
                animationDuration={800} 
            >
          
                
            </AreaChart>
            </PresenceTransition>
     </>
  
 
  );
}
