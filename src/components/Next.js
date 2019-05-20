import React from 'react';
import arrowF from './arrowF.png';
//https://cdn2.iconfinder.com/data/icons/arrows-vol-1-1/32/right2-512.png

const Next = ({ Fetch }) => {
	return(
		<div>
			<img className="hg" onClick={Fetch} alt="next" height="50px" src={arrowF} />
		</div>
	)
}

export default Next;