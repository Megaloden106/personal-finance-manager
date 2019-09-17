interface AppState {
  user: UserState;
  portfolio: PortfolioState;
}

type AppAction = UserAction | PortfolioAction;
