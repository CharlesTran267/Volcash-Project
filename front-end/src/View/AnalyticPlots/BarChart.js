import {useState,useEffect} from 'react';
import { Chart, registerables } from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import { reduce } from 'async';
import Plot from 'react-plotly.js';
import * as constants from "../../Constants"

const proxy = constants.PROXY
let data = []
var main_type = "main_type"
const axios = require('axios')
const color_dict = {
	'juvenile' : 'red',
	'lithic' : 'green',
	'free crystal' : 'blue',
	'altered material' : 'orange'
}

const BarChart = (props) =>{
	const [AFEs,setAFEs] = useState()
	const [particles,setParticles] = useState()

	let side = props.onGetSide();
	useEffect(()=>{
		axios.get(`${proxy}/volcanoes/getAFE`)
		.then(response => {
		  if(response.data.success){
		    setAFEs(response.data.afes)
		  } else{
		    alert("Failed to fetch data")
		  }
		})

		axios.get(`${proxy}/volcanoes/getParticles`)
		.then(data =>{
			if(data.data.success){
				setParticles(data.data.particles)
				
			}
			else{
				alert('Failed')
			}
		})
	
	      },[])
	if(AFEs && particles){
	let eruptiveStyleList = {}
	let eruptiveArray = []
	for(let i=0;i<AFEs.length;i++){
		eruptiveStyleList[AFEs[i]['eruptive_style']] = 1 ;
	}

	for(var key in eruptiveStyleList) {
		eruptiveArray.push(key)
	}
	
	
	let AFE_eruptive = {}
	let AFE_Table = {} 


	for(let i=0;i<AFEs.length;i++){
		AFE_Table[AFEs[i]['afe_code']] = {} 
		AFE_eruptive[[AFEs[i]['afe_code']]] = AFEs[i]['eruptive_style']
	}

	for(let i=0; i<particles.length;i++){
		if(AFE_Table[particles[i]['afe_code']][particles[i][main_type]] >=1 )
			AFE_Table[particles[i]['afe_code']][particles[i][main_type]] += 1 ;
		else 
			AFE_Table[particles[i]['afe_code']][particles[i][main_type]] = 1
	}


	let eruptive_basicComponent = {} 
	for(var key in eruptiveStyleList){
		eruptive_basicComponent[key] ={
			'altered material' : 0,
			'free crystal' : 0,
			'juvenile': 0,
			'lithic':0,
		}
	}

	for(var key in AFE_Table){
		for(var k in AFE_Table[key]){
			eruptive_basicComponent[AFE_eruptive[key]][k]+=AFE_Table[key][k];
		}
	}

	for(var key in eruptive_basicComponent){
		let s =0;
		for(var k in eruptive_basicComponent[key]){
			s+=eruptive_basicComponent[key][k]
		}
		eruptive_basicComponent[key]['total']  = s; 
	}

	
	data = []


	for(var k in eruptive_basicComponent['Lava fountaining']){
		let x = []
		let y = []
		for(var key in eruptive_basicComponent){
			if(k !== 'total'){
				y.push(eruptive_basicComponent[key][k]*100/eruptive_basicComponent[key]['total']);
				x.push(key);
			}
		}

	
		data.push({
			x:x,
			y:y,
			name: k,
			type: 'bar',
			marker:{
			color: color_dict[k],
			}
		})
	}



	// let data = {
	// 	x: ['giraffes', 'orangutans', 'monkeys'],
	// 	y: [20, 14, 23],
	// 	name: 'SF Zoo',
	// 	type: 'bar'
	// }

	


	}
	return (
	<div >
	<div onDoubleClick = {() =>{props.onPassZoomMode([],'barChart')}} >
	<Plot
        data={data}
	
        layout={ {width: side[0], height: side[1], title: 'Bar Chart',barmode :'stack' } }
	
		/>
	</div>
	</div>
      );
}

export default BarChart;