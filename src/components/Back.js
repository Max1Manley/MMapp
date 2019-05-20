import React from 'react';
import arrowB from './arrowB.png';
//https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right2-512.png

const Back = ({ Fetch }) => {
	return(
		<div>
			<img className="hg" onClick={Fetch} alt="back" height="50px" src={arrowB} />
		</div>
	)
}

export default Back;