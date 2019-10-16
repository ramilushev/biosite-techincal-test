import React, { useState, useEffect } from 'react';
import { Button, UserList } from './components';
import { User } from './types';
import { reject } from 'lodash';
import * as Api from './api';
import './App.css';

const App: React.FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);

    const users = await Api.getUsers();

    console.table(users);

    setUsers(users);
    setIsLoading(false);
  }

  useEffect(() => { getUsers() }, []);

  const createUser = async (firstName: string, lastName: string) => {
    const user = await Api.createUser({ firstName, lastName });

    console.log(user);

    setUsers(oldUsers => [...oldUsers, user]);
  }

  const deleteUser = async (id: string) => {
    await Api.deleteUser(id);

    setUsers(oldUsers => reject(oldUsers, user => user.id === id))
  }

  return (
    <div className="App">
      <header className="App-header">
        {
          isLoading
            ? <span>LOADING ...</span>
            : <UserList
              users={users}
              onDelete={deleteUser}
              onCreate={createUser}
            />
        }
      </header>
    </div>
  );
}

export default App;
