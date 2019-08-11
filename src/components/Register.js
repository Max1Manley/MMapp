import React from 'react';

const Register = ({ onSubmitRegister, nameChange, emailChange, passwordChange, onClickLogIn }) => {

	return(
		<div className="flexVC center moreTopMargin"> 
			<article >
				<main>
				  <div>
				    <fieldset id="sign_up">
				      <legend>Register</legend>
				      <div>
				        <label htmlFor="name">Name</label>
				        <br/>
				        <input 
				        	type="name" 
				        	name="name" 
				        	id="name" 
				        	onChange={nameChange}
				        />
				      </div>

				      <div>
				        <label htmlFor="email-address">Email</label>
				        <br/>
				        <input 
				        	type="email" 
				        	name="email-address" 
				        	id="email-address" 
				        	onChange={emailChange}
				        />
				      </div>
				      <div >
				        <label htmlFor="password">Password</label>
				        <br/>
				        <input 
					        type="password" 
					        name="password"  
					        id="password" 
					        onChange={passwordChange}
				        />
				      </div>
				    </fieldset>
				    <div>
				    	<br/>
				    	<input 
				      	onClick={onSubmitRegister}
					    type="submit" 
					    value="Click to Register" 
				      	/>
				    </div>
				    <div >
				      <p onClick={onClickLogIn} >Sign In</p>
				    </div>
				  </div>
				</main>
			</article>
		</div>
	);
}

export default Register;