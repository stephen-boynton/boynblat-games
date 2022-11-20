export const startNextGame = (set) => () => {
  set((state) => ({
    ...state,
    gamesLeft: state.gamesLeft - 1,
    gameNumber: state.gameNumber + 1,
  }))
}
