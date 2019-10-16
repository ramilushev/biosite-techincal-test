import React, { useState, useEffect, ChangeEvent} from 'react';
import { UserCard, UserField, Button } from '.';
import './styles/AddUser.css';

interface AddUserProps {
  onCreate: Function
}

export const AddUser = ({ onCreate }: AddUserProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => setIsLoading(false))

  function handleFirstNameChange(event: ChangeEvent) {
    setFirstName((event.target as HTMLInputElement).value);
  }

  function handleLastNameChange(event: ChangeEvent) {
    setLastName((event.target as HTMLInputElement).value);
  }

  function createUser() {
    onCreate(firstName, lastName);

    setFirstName('');
    setLastName('');
    setIsLoading(true);
  }

  return (
    <UserCard className="AddUser">
      {
        isLoading
          ? <span>LOADING ...</span>
          : <>
            <UserField label="First name">
              <input className="AddUser-input" value={firstName} onChange={handleFirstNameChange} />
            </UserField>
            <UserField label="Last name">
              <input className="AddUser-input" value={lastName} onChange={handleLastNameChange} />
            </UserField>
            <Button className="AddUser-button" label="Create User" onClick={createUser} />
          </>
      }
    </UserCard>
  );
}