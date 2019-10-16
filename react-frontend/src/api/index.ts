const URL = 'http://localhost:8080/api';

interface UserPayload {
  firstName: string,
  lastName: string
}

function post(url: string, action: string, data: object) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': `application/vnd.in.biosite.${action}+json`
    },
    body: JSON.stringify(data),
  })
}

export const getUsers = async () => {
    const users = await fetch(`${URL}/users`);

    console.table(users);

    return users.json();
}

export const createUser = async ({ firstName, lastName }: UserPayload) => {
  const data = await post(`${URL}/users/commands`, 'create-user', {
    firstName,
    lastName
  })

  return data.json();
}

export const deleteUser = async (id: string) => {
  return post(`${URL}/users/commands`, 'delete-user', { id });
}

