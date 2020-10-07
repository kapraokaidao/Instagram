export interface RootState {
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  errorData: any
}

export const rootState: RootState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorData: null
}
