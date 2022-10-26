import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Dropdown, Button } from 'antd';
import { useState } from 'react';

import { Plot } from 'react-plotly.js';

const Essentials = ['crystallinity','shape','hydro_alter_degree','sub_type']

const DropDownForSubType = (props) => {
	const [time,setTime] = useState(0);


	var data;
	var f;
	function handleChange(a){
	}

	try{
		
		handleChange = function(a){
			props.onPassSubType(a);
		}
		data = Essentials;
		f = 'sub_type'
	}
	catch(error){

	}
	
	
	const [title,setTitle] = useState(f);

	function ChooseVariable (x) {
		setTitle(x);
	}

	

	function mapping(x){



		return (<Menu.Item >
			<a target="_blank" onClick = {() => {ChooseVariable(x)
				handleChange(x);
			}} >
		  		{x}
			</a>
	      		</Menu.Item> );
	}


	const menu = (
		<Menu >	
		  {data.map(x => mapping(x))}
		</Menu>
	      );


	return(
	<div style={{marginBottom:"20px"}}>
		<Dropdown  overlay={menu} placement="bottomCenter" arrow>
      		<Button >{title}</Button>
    		</Dropdown>
	</div>
	);
	
}


export default DropDownForSubType;