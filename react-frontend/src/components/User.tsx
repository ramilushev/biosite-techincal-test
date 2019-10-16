import React from 'react';
import { Button, UserCard, UserField } from '.';
import './styles/User.css';

interface UserProps {
	onDelete: Function,
	firstName: string,
	lastName: string,
	id: string,
	qualifications: string[]
}

export const User = ({ id, firstName, lastName, qualifications, onDelete }: UserProps) => {
	return (
		<UserCard>
      <UserField label={'First name'}>
        {firstName}
      </UserField>
      <UserField label="Last name">
        {lastName}
      </UserField>
      <UserField label="Qualifications">
        {!qualifications.length && <span>None</span>}
        {qualifications.map(qualification => <span>{qualification}</span>)}
      </UserField>
			<div className="User-button-container">
				<Button className="User-button" label="Delete" onClick={() => onDelete(id)}/>
			</div>
		</UserCard>
	)
};