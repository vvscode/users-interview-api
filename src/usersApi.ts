import faker from 'faker';

let id = 1;

const sleep = (x: number) => new Promise(resolve => setTimeout(resolve, x));
const random = (min: number, max: number) => min + Math.floor(Math.random() * (max - min));

const maybeMakeDelay = async () => {
  const delay = Number((window as any)?.__USERS_API_SETTINGS__?.delay) || 0;
  await sleep(delay);
}

const maybeThrowError = async () => {
  const probability = Number((window as any)?.__USERS_API_SETTINGS__?.errorsProbability) || 0;
  if (Math.random() < probability) {
    throw {
      message: 'Something went wrong',
      reason: 'External API is down'
    }
  }
}

export type User = {
  name: string;
  email: string;
  login: string;
  id: number;
  last_modified_timestamp: number;
}

let data: User[] = [...Array.from({ length: 200 })].map((_, index) => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  login: faker.lorem.slug(),
  id: id++,
  last_modified_timestamp:
    Number(new Date(random(2012, 2012), random(1, 11), random(1, 28))) / 1000,
}));

export const getUsers = async ({ page = 1, limit = data.length } = {}): Promise<{
  data:User[],
  total: number,
  page: number,
  pageSize: number
}> => {
  await maybeMakeDelay();
  await maybeThrowError();

  return {
    data: data.slice(limit * Math.max(page - 1, 0), limit * page),
    total: data.length,
    page,
    pageSize: limit
  }
};

export const createUser = async (userData: Omit<User, 'id' | 'last_modified_timestamp'>): Promise<User> => {
  await maybeMakeDelay();
  await maybeThrowError();

  const newUser: User = {
    ...userData,
    id: id++,
    last_modified_timestamp: Number(new Date()) / 1000,
  };

  data.push(newUser);

  return newUser;
};

export const deleteUser = async (id: number) => {
  data = data.filter(user => user.id !== id);

  return;
}

export default {
  getUsers,
  createUser,
  deleteUser,
};
