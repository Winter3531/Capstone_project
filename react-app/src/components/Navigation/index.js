import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { FaHome } from 'react-icons/fa';

import './Navigation.css';
import { getFollowsThunk } from '../../store/follow';
import { collectionUserThunk } from '../../store/session';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state?.session?.user);
	const follows = useSelector(state => state?.follows)
	const likes = useSelector(state => state?.likes)
	const [showFollow, setShowFollow] = useState(false)
	const [showLike, setShowLike] = useState(false)
	const dispatch = useDispatch();


	const setFollowMenu = async (e) => {
		e.preventDefault()
		if (showFollow) {
			return setShowFollow(false);
		}
		return setShowFollow(true)
	}

	const setLikesMenu = async (e) => {
		e.preventDefault()
		if (showLike) {
			return setShowLike(false);
		}
		return setShowLike(true)
	}

	useEffect(() => {
		if (sessionUser !== null) {
			dispatch(getFollowsThunk(sessionUser?.id))
		}
	}, [isLoaded, showFollow, showLike, sessionUser])

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
			{sessionUser !== null ? (
				<>
					{showFollow ? (
						<div>
							<button className='all-followed-users-button' onClick={setFollowMenu}>Followed Users</button>
							<div className='all-followed-users-div' >
								{Object.values(follows).map(follow => {
									return (
										<NavLink className="followed-user-entry" key={`followed-user-${follow.id}`} onClick={e => dispatch(collectionUserThunk(follow.likeable_id))} exact to={`/collection/${follow.likeable_id}`}>{follow.username}</NavLink>
									)
								})}
							</div>

						</div>
					) : (
						<button className='all-followed-users-button' onClick={setFollowMenu}>Followed Users</button>
					)}
					{showLike ? (
						<div>
							<button className='all-liked-recipes-button' onClick={setLikesMenu}>Liked Recipes</button>
							<div className='all-liked-recipes-div' >
								{Object.values(likes).map(like => {
									return (
										<NavLink className="liked-recipe-entry" key={`liked-recipe-${like.id}`} exact to={`/recipes/${like.likeable_id}`}>{like.recipe}</NavLink>
									)
								})}
							</div>
						</div>
					) : (
						<button className='all-liked-recipes-button' onClick={setLikesMenu}>Liked Recipes</button>
					)}
				</>
			) : (
				<>
				</>
			)}
		</div>
	);
}

export default Navigation;
