import React from 'react';
import { User, AddUser } from '.';
import { User as UserType } from '../types';
import './styles/UserList.css';

interface UserListProps {
	users: Array<UserType>,
  onDelete: Function,
  onCreate: Function
}

export const UserList = ({ users, onDelete, onCreate }: UserListProps) => {
	console.log(users);
	
	return (
		<div className="UserList">
      {users.map(user => <User key={user.id} {...user} onDelete={onDelete} />)}
      <AddUser onCreate={onCreate} />
		</div>
	);
}