//Max Manley 2019
import React, { Component } from 'react';
import NavBarSearched from '../components/NavBarSearched';
import publicDomain from './publicDomain';
import SquareCard from '../components/SquareCard';
import Favorites from '../components/Favorites';
import Register from '../components/Register';
import LogIn from '../components/LogIn';
import Next from '../components/Next';
import Back from '../components/Back';
import About from '../components/About';
import './App.css';

//keeps track of where you are in the this.state.searched array
var nN = 0;
//initial state to reset state when signing out
const initialState = {
	//makes sure homepage artwork is loaded before rendering
	randomsLoaded: 0,
	//home artwork data
	random0: {},
	random1: {},
	random2: {},
	//when searching, the array of relevant art IDs is stored here
	searched: undefined,
	//controls what gets rendered
	route: "LogIn",
	//data on searched works of art are temporarily saved here
	test: undefined,
	//saves number for display of where you are in the this.state.searched array
	nN: 0,
	//data that is sent to server/database in order to signin/register
	userName: undefined,
	userEmail: undefined,
	userPassword: undefined,
	//data recieved from database is saved here
	userData: undefined,
	//array of objects with full favorites information such as imgURL, artist and title is saved here
	favsData: [],	
}

class App extends Component {
	constructor () {
		super();
		this.state = initialState;
	}

	componentWillMount() {	
		this.getRandoms();
	}
	
	//fetching random works of art from public domain array
	getRandoms = () => {
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random0: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random1: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
		fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${publicDomain[Math.floor(Math.random()*publicDomain.length)]}`)
		.then (response => response.json())
		.then (art => {
			this.setState({
				random2: art,
				randomsLoaded: this.state.randomsLoaded + 1,
			})
		});	
	}

	//first fetch returns array of objectIDs related to query and saves list in this.state.searched
	//second fetch returns data of first item in array and saves to this.state.test
	onSearchChange = (event) => {
		if (event.key === 'Enter'){
			this.setState({	nN: 0, });
			nN = 0;
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?q=${event.target.value}`)
			.then (response => response.json())
			.then (art => {
				this.setState({
					searched: art,	
				})
				if (this.state.searched.objectIDs) {
					fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[0]}`)
					.then(response => response.json())
					.then(art => {
						window.scrollTo(0, 0);
						this.setState({
							test: art,
							route: "displaySearch",
						})
					})					
				} else {
					alert("No Results");
					this.setState({ route: "Home" });
				}

			})					
		}
	}

	//fetches next item in the this.state.searched.objectIDs array and saves it in this.state.test, also increments nN
	singleFetch = () =>{
		if (nN < this.state.searched.objectIDs.length - 1){
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[nN+1]}`)
			.then(response => response.json())
			.then(art => {
				this.setState({
					test: art,
					nN: this.state.nN + 1,
				})
				nN++;
			})			
		}
	}

	//fetches previous item in the this.state.searched.objectIDs array and saves it in this.state.test, also decrements nN
	backFetch = () =>{
		if(nN > 0){
			fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.searched.objectIDs[nN-1]}`)
			.then(response => response.json())
			.then(art => {
				this.setState({
					test: art,
					nN: this.state.nN - 1,
				})
				nN--;
			})			
		}
	}

	//series of functions setting the route
	//window.scrollTo() sets view to top of page
	onClickHome = () => {
		this.setState({ route: "Home", });
		window.scrollTo(0, 0);
	}

	onClickAbout = () => {
		this.setState({ route: "About" });
	}

	onClickLogIn = () => {
		this.setState({ route: "LogIn"});
	}

	onClickRegister = () => {
		this.setState({ route: "Register"});
	}

	onClickLogOut = () => {
		this.setState(initialState);
		this.getRandoms();
	}

	//sends you to favorites as well as fetching current favorites for display, saving them in this.state.favsData
	onClickFavorites = () => {
		fetch(`https://mmexpressjstest.herokuapp.com/favorites/${this.state.userData.name}`)
		.then(res => res.json())
		.then(data => {
			this.setState({ favsData: [] });
			//responds with error and doesn't take you to favorites page if not checked with this if statement
			if (data[0].favorites){
				for (let i = 0; i <= data[0].favorites.length-1; i++) {
					fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${data[0].favorites[i]}`)
					.then (response => response.json())
					.then (data => {
						this.setState({ favsData: this.state.favsData.concat(data) });
					});
				}				
			}
		})
		.then(() => {
			this.setState({ route: "Favorites"});
			window.scrollTo(0, 0);
		})
	}

	//sends information to server/database and recieves response with the user data from the database for use in this.state.userData
	onSubmitRegister = () => {
		fetch('https://mmexpressjstest.herokuapp.com/register', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				name: this.state.userName,
				email: this.state.userEmail,
				password: this.state.userPassword
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.id){
				this.setState({ userData: data });
				this.setState({ route: "Home" });
			} else { alert('Register Failed') }
		})
		.catch(err => console.log(err));
	}		
	
	//logs in and manages this.state.favsData
	onSubmitLogIn = () => {
		fetch('https://mmexpressjstest.herokuapp.com/signin', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.userEmail,
				password: this.state.userPassword
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.id){
				this.setState({ userData: data });
			} else { 
				alert('Log In Failed') }
		})
		.then(() => {
			//responds with error and doesn't take you to favorites page if not checked with this if statement
			if (this.state.userData.favorites){
				for (let i = 0; i <= this.state.userData.favorites.length-1; i++) {
					fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.userData.favorites[i]}`)
					.then (response => response.json())
					.then (art => {
						this.setState({ favsData: this.state.favsData.concat(art) });
					});
				}				
			} 
			this.onClickHome(); 
		})
		.catch(err => console.log(err));
	}	

	//series of functions that keep track of login and register forms
	nameChange = (event) => {
		this.setState({ userName: event.target.value});
	}

	emailChange = (event) => {
		this.setState({ userEmail: event.target.value });
	}

	passwordChange = (event) => {
		this.setState({ userPassword: event.target.value });
	}

	//sends request to add a favorite to the database
	addFavorite = (artId) => {
		fetch('https://mmexpressjstest.herokuapp.com/favorites', {
			method: 'put',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				putFavorites: artId,
				name: this.state.userData.name,
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data){
				alert('Added To Favorites');
			} else { alert('Failed to add Favorite, Please try again') }
		})
		.catch(err => console.log(err));		
	}

	//sends request to remove a favorite from the database
	removeFavorite = (artId) => {
		fetch('https://mmexpressjstest.herokuapp.com/favorites', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				deleteFavorites: artId,
				name: this.state.userData.name,
			})
		})
		.then(res => res.json())
		.then(data => {
			alert('Removed From Favorites');
		})
		.then(() => this.onClickFavorites())
		.catch(err => console.log(err));			
	}

	//renders elements based on this.state.route
	render() {
		if (this.state.route === "LogIn") {
			return (
				<LogIn 
				onSubmitLogIn={this.onSubmitLogIn} 
				emailChange={this.emailChange} 
				passwordChange={this.passwordChange}
				onClickRegister={this.onClickRegister}
				/>
			)
		} else if (this.state.route === "Register") {
			return ( 
				<Register 
				onSubmitRegister={this.onSubmitRegister} 
				emailChange={this.emailChange} 
				passwordChange={this.passwordChange} 
				nameChange={this.nameChange} 
				onClickLogIn={this.onClickLogIn}
				/>
			)
		} else if (this.state.randomsLoaded >= 3 && this.state.route === "displaySearch" &&  this.state.searched.objectIDs) {
			return (
		    	<div className="App">

		    			<NavBarSearched
		    			onClickAbout={this.onClickAbout}
		    			onClickHome={this.onClickHome}
		    			onClickFavorites={this.onClickFavorites}
		    			onSearchChange={this.onSearchChange} 
		    			onClickLogOut={this.onClickLogOut}
		    			/>

			      	<div className="flexVC moreTopMargin">
			      		<Back Fetch={this.backFetch} />
			      		<SquareCard 
			      		addFavorite={this.addFavorite}
			      		nN={this.state.nN} 
			      		route={this.state.route} 
			      		searchLength={this.state.searched.objectIDs.length} 
			      		theState={this.state.test} 
			      		/>
			      		<Next Fetch={this.singleFetch} />
			    	</div>
		    	</div>   				
			)
		} else if (this.state.randomsLoaded >= 3 && this.state.route === "About"){
			return (
				<div className="App">
	    			<NavBarSearched
	    			onClickFavorites={this.onClickFavorites}
	    			onClickAbout={this.onClickAbout}
	    			onClickHome={this.onClickHome}
	    			onSearchChange={this.onSearchChange} 
	    			onClickLogOut={this.onClickLogOut}
	    			/>

					<About />
				</div>
			)
		} else if (this.state.randomsLoaded >= 3 && this.state.userData && this.state.route === "Home") {
        	return (
		    	<div className="App">

	    			<NavBarSearched
	    			onClickFavorites={this.onClickFavorites}
	    			onClickAbout={this.onClickAbout}
	    			onClickHome={this.onClickHome}
	    			onSearchChange={this.onSearchChange} 
	    			onClickLogOut={this.onClickLogOut}
	    			/>

			      	<div className="white flexVC">
			      		<SquareCard 
			      		addFavorite={this.addFavorite}
			      		nN={this.state.nN} 
			      		route={this.state.route}  
			      		theState={this.state.random0} 
			      		/>
			    	</div>
			    	<div className="lightGrey flexVC">
			    		<SquareCard 
			      		addFavorite={this.addFavorite}
			    		nN={this.state.nN} 
			    		route={this.state.route} 
			    		theState={this.state.random1} 
			    		/>
			    	</div>
			    	<div className="grey flexVC">
			    		<SquareCard 
			      		addFavorite={this.addFavorite}
			    		nN={this.state.nN} 
			    		route={this.state.route} 
			    		theState={this.state.random2} 
			    		/>
		    		</div>
		    	</div>    			
    		)		
    	} else if (this.state.route === "Favorites") {
			return (
				<div className="App">
					<NavBarSearched
	    			onClickAbout={this.onClickAbout}
	    			onClickHome={this.onClickHome}
	    			onClickFavorites={this.onClickFavorites}
	    			onSearchChange={this.onSearchChange} 
	    			onClickLogOut={this.onClickLogOut}
	    			/>
	    			<div className="itemCenter topMargin">
						<Favorites 
						favsData={this.state.favsData} 
						removeFavorite={this.removeFavorite}
						/>
					</div>
				</div>
			)
		} else {
    		return <div className="flexVC">Loading...</div>
    	}
	}	
}

//TODO
//add confirm password field to register
//fix search arrow positions
//have pressing enter button log you in/register you
//change 'add/remove to favorites' to an icon
//reuse squarecard inside of favorites
//create option for guest/temporary user?

//BUGS
//clicking through searched items quickly can cause nN to be off

export default App;