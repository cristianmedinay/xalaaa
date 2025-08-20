/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */

export interface IPayloadAction<T> {
  payload?: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  type: string;
}

export interface IReducerMapping<StateType, PayloadType> {
  [key: string]: (
    state: StateType,
    payload: IPayloadAction<PayloadType>
  ) => StateType;
}

export const createPayloadAction = <Payload>(type: string) => {
  return (payload: Payload): IPayloadAction<Payload> => {
    return {
      payload,
      type,
    };
  };
};

export const createReducers = <
  StateType,
  T,
  ActionTypes extends IPayloadAction<T>
>(
  initialState: StateType,
  mappings: IReducerMapping<StateType, T>
) => {
  return (state: StateType = initialState, action: ActionTypes): StateType => {
    const mapping = mappings[action.type];
    if (mapping) {
      return mapping(state, action);
    }
    return state;
  };
};
