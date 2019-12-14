const api = '/api/user';

export const userData: UserState = {
  username: 'Guest',
  accessLevel: 0,
};

export const UserSenarios: Scenario[] = [
  {
    scenarios: {
      GET: {
        delay: Math.floor(Math.random() * 150) + 100,
        description: 'User Data',
        response: {
          body: userData,
          status: 200,
        },
      },
    },
    url: `${api}`,
  },
];
