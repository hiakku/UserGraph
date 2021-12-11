import * as d3 from "d3";
import { useEffect } from "react";

const DataVisual = () => {
  useEffect(()=>{
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const friendsList = users.map((item, index)=>{
      return {
        x: index,
        y: item.friends.length
      }
    })
    if(friendsList.length) {
        let xScale = d3.scaleLinear().domain([0,15]).range([0, 300])
        let yScale = d3.scaleLinear().domain([0,100]).range([300, 0]) 
        
        let line = d3.line()
         .x(dt => xScale(dt.x))
         .y(dt => yScale(dt.y))
        
        let xAxis = d3.axisBottom(xScale)
        let yAxis = d3.axisLeft(yScale)
        
        d3.select('#chart').selectAll('path').datum(friendsList) 
       .attr('d', d3.line().x(dt => xScale(dt.x)) 
       .y(yScale(0))).attr("stroke", "green").attr('fill', 'none') 

        d3.select('#chart').selectAll('path').attr('d', line) 
        
        d3.select('#chart').append("g")
        .attr("transform", "translate(0, " + 300 + ")").call(xAxis)
   
        d3.select('#chart').append("g")
        .attr("transform", "translate(0, 0)").call(yAxis)
    }
  },[])
   return (
   <div>
     <h2>Data Visualization</h2>   
      <svg id="chart" width = {350} height = {350}><path/></svg>
    </div>
   )
 }

 export default DataVisual;