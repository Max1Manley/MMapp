import React from 'react';

const NavBarSearched = ({ onSearchChange, onClickHome, onClickAbout, onClickFavorites, onClickLogOut }) => {

	return(
		<div className="topBar">
			<ul className="menu menuPointer">
				<li>Menu
					<ul className="menu">
						<li onClick={onClickHome}>Home</li>
						<li onClick={onClickFavorites}>Favorites</li>
						<li onClick={onClickAbout}>About</li>
						
						<li onClick={onClickLogOut}>Sign Out</li>
					</ul>
				</li>
			</ul>
			<span className="air">
				<input 
				placeholder="Search Met Museum"
				onKeyPress={onSearchChange} />
			</span>			
		</div>
	);
}

export default NavBarSearched;