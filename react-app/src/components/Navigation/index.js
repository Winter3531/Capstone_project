import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaHome } from 'react-icons/fa';

import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='nav-bar-left'>
				<NavLink exact to="/collection"><FaHome id='nav-bar-home-button'/></NavLink>
			{isLoaded && (
				<div id='nav-bar-profile-div'>
					<ProfileButton id='div-div' user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
