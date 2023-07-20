import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaHome } from 'react-icons/fa';

import './Navigation.css';
import { getFollowsThunk } from '../../store/follow';
import { Redirect } from "react-router-dom";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);
	const follows = useSelector(state => state?.follows)
	const dispatch = useDispatch();

	const selectUser = async (e) => {
		e.preventDefault()
		console.log('HERE')
	}

	useEffect(() => {
		dispatch(getFollowsThunk(sessionUser?.id))
	}, [dispatch, isLoaded])

	return (
		<div>
			<div className='nav-bar-left'>
				<NavLink exact to="/collection"><FaHome id='nav-bar-home-button' /></NavLink>
				{isLoaded && (
					<div id='nav-bar-profile-div'>
						<ProfileButton id='div-div' user={sessionUser} />
					</div>
				)}
			</div>
			<select className='follow-users-dropdown' >
				<option default >Followed Users</option>
				{Object.values(follows).map(follow => {
					return (
						<option onSelect={selectUser}>{follow.username}</option>
					)
				})}
			</select>
		</div>
	);
}

export default Navigation;
