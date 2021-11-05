# Fake users API for interviews

[![NPM](https://nodei.co/npm/users-interview-api.png)](https://npmjs.org/package/users-interview-api)


The package provides next api, which can be used during the interview:

```ts
declare type User = {
    name: string;
    email: string;
    login: string;
    id: number;
    last_modified_timestamp: number;
};

export declare const getUsers: ({ page, limit }: {
    page?: number | undefined;
    limit?: number | undefined;
}) => Promise<{
  data:User[],
  total: number,
  page: number,
  pageSize: number
}>;


export declare const createUser: (userData: Omit<User, 'id' | 'last_modified_timestamp'>) => Promise<User>;
```

---

Some usage examples:

```ts
import { getUsers, createUser } from 'users-interview-api';


// get list of users (default page)
getUsers().then((usersList) => console.log('users:', usersList));

// specific page
getUsers({ page: 2, limit: 3 }).then((usersList) => console.log('users:', usersList.data));

// create new user
createUser({
    name: 'Bob',
    email: 'b0b@mail.cool',
    login: 'dud3',
}).then((user) => console.log('New user created:', user));
```