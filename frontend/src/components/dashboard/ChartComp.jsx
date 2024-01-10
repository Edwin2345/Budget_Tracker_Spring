import { Chart } from "react-google-charts";
import categoriesArr from "../utils/catergories.js";



function ChartComp({summaryData}){

//Map data in proper format
const chartData = summaryData.map((e)=>{
 return [e.category, e.total_amount]
})

chartData.unshift(["Budget Category", "Total Amount"])

//map colors for slcies
 const colorArr =  summaryData.map((e)=>{
   return {color: categoriesArr[e.id-1].color}
 })


const options = {
  pieSliceText: "label",
  pieStartAngle: 100,
  backgroundColor: '#142733',
  legend: "none",
  pieSliceTextStyle: {color: "#f8fdfe", fontSize: 18,  bold: true },
  slices: colorArr
};

return(
 <Chart 
  chartType="PieChart"
  data={chartData}
  options={options}
  width={"100%"}
  height={"70vh"}
/>
)
}

export default ChartComp;

