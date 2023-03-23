import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

import SelectForSunBurst from './SelectWithCheckForSunBurst';
import Button from './SubmitButton';
import {useState} from 'react'
import DropDownForSunBurst from './DropDownForSunBurst';

// var values = [0, 0, 0, 0];
// var labels = ["juvenile", "lithic", "free crystal", "undefined"];
// var parents =  ["", "", "", ""];

function IntToChar(int) {
	// 👇️ for Uppercase letters, replace `a` with `A`
	const code = 'a'.charCodeAt(0);
      
	return String.fromCharCode(code + int);
      }
var main_type = "main_type"
var crystallinity = "crystallinity"
var alteration_degree = "hydro_alter_degree"
function intToChar(int) {
	const code = 'A'.charCodeAt(0);
      
	return String.fromCharCode(code + int);
      }
function getRandomColor() {
	var letters = '0123456789ABCDEF';
	var color = '#';
	for (var i = 0; i < 6; i++) {
	  color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
      }
var volColor = {
	'juvenile' : ['red','#FF8886'],
	'lithic' : ['3A9BDC','#45b6fe'],
	'free crystal' : ['yellow','#26D701']
}

function NestedPieChart(props){
	const [SunBurstVariable,setSunBurstVariable] = useState()
	const [SunBurstFinalVariable,setSunBurstFinalVariable] = useState([{value:1,label:"juvenile"},{value:2,label:"lithic"},{value:3,label:"free crystal"}])
	const [sunBurstDataVariable,setSunBurstDataVariable] = useState('crystallinity')
	
	let side = props.onGetSide()
	let data=props.onGetData();
	let variable = SunBurstFinalVariable;
	//let variable= props.onGetVariable();
	let labels =[]
	let values=[]
	let parents=[]
	// for(let i=0;i<variable.length;i++){
	// 	labels.push(variable[i].label)
	// 	values.push(0);
	// 	parents.push("")
		
	// }
	const PassSunBurstDataVariable = (a) =>{
		setSunBurstDataVariable(a);
	}

	const PassSunBurstVariable = (a) => {
		setSunBurstVariable(a)
	}
	

	const submitSunBurstVariable =()=>{
		setSunBurstFinalVariable(SunBurstVariable)
	}
	

	// let cc = setSunBurstDataVariable
	// let Data = []
// 	if(cc !== 'overview'){
// 	for (let i=0;i<data.length;i++){
		
// 			if(data[i]['volc_name'] === cc){
// 				Data.push(data[i])
// 			}
			


// 	data = Data

// }

	

	let crysTable ={}
	let shapeTable ={}
	let alterTable = {}
	for(let i=0;i<variable.length;i++){
		crysTable[variable[i].label] ={}
		shapeTable[variable[i].label] = {}
		alterTable[variable[i].label] = {}
	}

	for(let i=0;i<data.length;i++){
		if(crysTable[data[i][main_type]]&&data[i][crystallinity]){
			
			crysTable[data[i][main_type]][data[i][crystallinity]] =0;}
		else if(crysTable[data[i][main_type]])
			crysTable[data[i][main_type]]['undefined'] =0;
		else
			crysTable['undefined'] = 0
		if(shapeTable[data[i][main_type]]&&data[i]["shape"])	
			shapeTable[data[i][main_type]][data[i]["shape"] ] =0;
		else if(shapeTable[data[i][main_type]])
			shapeTable[data[i][main_type]]['undefined'] =0;
		else
			shapeTable['undefined'] = 0
		if(alterTable[data[i][main_type]]&&data[i][alteration_degree])
			alterTable[data[i][main_type]][data[i][alteration_degree]] =0;
		else if(alterTable[data[i][main_type]])
			alterTable[data[i][main_type]]['undefined'] =0;
		else
			alterTable['undefined'] = 0
	}
	for(let i=0;i<data.length;i++){
		if(data[i][main_type]&&data[i][crystallinity]&&crysTable[data[i][main_type]])
			crysTable[data[i][main_type]][data[i][crystallinity]] +=1;
		else if(data[i][main_type]&&crysTable[data[i][main_type]])
			crysTable[data[i][main_type]]['undefined'] +=1;
		else
			crysTable['undefined'] +=1;
		if(data[i][main_type]&&data[i]["shape"]&&shapeTable[data[i][main_type]])
			shapeTable[data[i][main_type]][data[i]["shape"] ] +=1;
		else if(data[i][main_type]&&shapeTable[data[i][main_type]])
			shapeTable[data[i][main_type]]['undefined'] +=1;
		else
			shapeTable['undefined'] +=1;
		if(data[i][main_type]&&data[i][alteration_degree]&&alterTable[data[i][main_type]])
			alterTable[data[i][main_type]][data[i][alteration_degree]] +=1;
		else if(data[i][main_type]&&alterTable[data[i][main_type]])
			alterTable[data[i][main_type]]['undefined'] +=1;
		// else
		// 	alterTable['undefined'] +=1;
	}


	let table = {}
	if(sunBurstDataVariable === 'crystallinity'){
		table = crysTable
	}
	else if(sunBurstDataVariable === 'shape'){
		table = shapeTable
	}
	else{
		table = alterTable
	}
	


	for(const[key,value] of Object.entries(table)  ){
		for(const[k,v] of Object.entries(value)){
			
			if(k !== 'undefined' ){
			labels.push(k);
			parents.push("");
			values.push(0);}
		// 	else if(k === 'undefined'){
		// 	labels.push(k+key)
		// 	values.push(0)
		// 	parents.push("")
		// }
			// if(key !== 'undefined')
			//parents.push("")
		}
	}


	for(let i=0;i<variable.length;i++){
		
		for(const[key,value] of Object.entries(table[variable[i].label])){
		
			
			
			
			if(key === 'undefined'){
			// labels.push(variable[i].label)
			// parents.push(key+variable[i].label)
			// values.push(0)
		}
			else{
			labels.push(variable[i].label)
			parents.push(key)
			values.push(table[variable[i].label][key])
			}
	

		}
		// if(crysTable[variable[i].label]['undefined'])
		// 	if(crysTable[variable[i].label]['undefined']>0)
		// 		values.push(crysTable[variable[i].label]['undefined']);
		// 	else
		// 		values.push(0)
		// else
		// values.push(crysTable[variable[i].label])
		
		
	}
	let c=0;
	let ids = []
	for(var key in table){
		for(var k in table[key]){
			if(k !== 'undefined'){
				ids.push(key + " - " + k)
				c+=1
			}
		}

	}
	
	for(let i=c;i<labels.length;i++){
		// if(i>0 && labels[i]===labels[i-1]){
			ids.push(labels[i]+i)
		// }
		// else
		// ids.push(labels[i] )
		
	}

	let p = [];
	for(let i=0;i<c;i++){
		p.push("");
	}

	for(let i=c;i<parents.length;i++){
		p.push(ids[i-c])
	}
	
	let colors = []
	let front = []
	let back = []
	for(let i =labels.length -1;i>=labels.length/2;i--){
		back.unshift(volColor[labels[i]][0]);
		front.unshift(volColor[labels[i]][1]);
		
	}

	for(let i=0;i<front.length;i++){
		colors.push(front[i]);
	}

	for(let i=0;i<back.length;i++){
		colors.push(back[i])
	}

	const e = ()=>{
		return false
	}

	// for(let i=0;i<labels.length;i++){
	// 	if(i>0 && i>=9 && labels[i] === labels[i-1])
	// 		colors.push(colors[i-1]);
	// 	else
	// 		colors.push(volColor[labels[i]])

	// }

	let d={}
	let t = []
	for(let i=0;i<labels.length;i++){
		if(i>0 && labels[i]===labels[i-1]){
			t.push("")
		}
		else{
			t.push(labels[i])
		}
	}

	
	const doubleClick = () =>{
	
		props.onPassZoomMode(SunBurstFinalVariable,"sunburstPlot");
	}

	return (
				<div>
				<div style={{marginTop:"20px", marginBottom:"20px", marginLeft:"-30px"}}>
					<DropDownForSunBurst  onPassSunBurstDataVariable= {PassSunBurstDataVariable} />
				</div>
				<div>
					<SelectForSunBurst onPassSunBurstVariable = {PassSunBurstVariable}/>
					
				</div>
				<div style={{float:"right" ,marginTop:"10px", marginBottom:"10px"}} >
					<Button onSubmitSunBurstVariable = {submitSunBurstVariable}/>
				</div>
		<div onDoubleClick ={doubleClick}>
			<Plot
        data={[{
		labels: t,
		parents: p,
		ids: ids,
		type: "sunburst",
		// values:  values,
		values: values,
		sort:false,
		marker:{line:{width:0},
		
		 branchvalues:"total",
		colors:colors,
	}
		}
	]}		
									
        layout={ {width: side[0], height: side[1], title: 'Sunburst',sort:false} }
      />
      </div>
		</div>
	)
}

export default NestedPieChart;