/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import * as Consts from "./consts";
import { IUserState, UserActionsTypes } from "./types";

export const initialState: IUserState = {
  action: undefined,
  profile: {},
  consents: {},
  consent: {},
  settings: {},
  purchase: {},
  purchases: {},
  towns: {
    Entities: [],
    TotalCount: 0,
  },
  channels: { Entities: [], isProcessing: false },
};

export const userReducer = (
  state = initialState,
  action: UserActionsTypes
): IUserState => {
  switch (action.type) {
    case Consts.GET_PROFILE:
    case Consts.UPDATE_PROFILE:
    case Consts.DELETE_ACCOUNT: {
      return {
        ...state,
        action,
        profile: {
          ...state.profile,
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_SETTINGS: {
      return {
        ...state,
        action,
        settings: {
          ...state.settings,
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_SETTINGS_SUCCESS: {
      return {
        ...state,
        action,
        settings: {
          ...state.settings,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_SETTINGS_FAILURE: {
      return {
        ...state,
        action,
        settings: {
          ...state.settings,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_PROFILE_SUCCESS:
    case Consts.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        action,
        profile: {
          Data: action.payload,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.GET_PROFILE_FAILURE:
    case Consts.UPDATE_PROFILE_FAILURE:
    case Consts.DELETE_ACCOUNT_FAILURE: {
      return {
        ...state,
        action,
        profile: {
          ...state.profile,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.DELETE_ACCOUNT_SUCCESS: {
      return {
        ...state,
        action,
        profile: {
          ...state.profile,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_CONSENT: {
      return {
        ...state,
        action,
        consent: {
          ...state.consent,
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.GET_USER_CONSENTS:
    case Consts.UPDATE_USER_CONSENTS: {
      return {
        ...state,
        action,
        consents: {
          ...state.consents,
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_CONSENT_SUCCESS: {
      return {
        ...state,
        action,
        consent: {
          Data: action.payload,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.GET_USER_CONSENTS_SUCCESS:
    case Consts.UPDATE_USER_CONSENTS_SUCCESS: {
      return {
        ...state,
        action,
        consents: {
          Data: action.payload,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.UPDATE_USER_CONSENT_FAILURE: {
      return {
        ...state,
        action,
        consent: {
          ...state.consent,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_USER_CONSENTS_FAILURE:
    case Consts.UPDATE_USER_CONSENTS_FAILURE: {
      return {
        ...state,
        action,
        consents: {
          ...state.consents,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.CANCEL_SUBSCRIPTION:
    case Consts.REACTIVATE_SUBSCRIPTION:
    case Consts.CHANGE_SUBSCRIPTION_PAYMENT_METHOD: {
      return {
        ...state,
        purchase: {
          ...state.purchase,
          [action.userSubscriptionId]: {
            IsProcessing: true,
          },
        },
      };
    }
    case Consts.CANCEL_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        purchase: {
          ...state.purchase,
          [action.userSubscriptionId]: {
            IsProcessing: false,
          },
        },
      };
    }
    case Consts.REACTIVATE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        purchase: {
          ...state.purchase,
          [action.userSubscriptionId]: {
            IsProcessing: false,
          },
        },
      };
    }
    case Consts.REACTIVATE_SUBSCRIPTION_SUCCESS: {
      return {
        ...state,
        purchase: {
          ...state.purchase,
          [action.userSubscriptionId]: {
            IsProcessing: false,
          },
        },
      };
    }
    case Consts.CANCEL_SUBSCRIPTION_FAILURE:
    case Consts.REACTIVATE_SUBSCRIPTION_FAILURE:
    case Consts.REACTIVATE_SUBSCRIPTION_FAILURE: {
      return {
        ...state,
        purchase: {
          ...state.purchase,
          [action.userSubscriptionId]: {
            IsProcessing: false,
            Error: action.error,
          },
        },
      };
    }
    case Consts.SEARCH_USER_ASSET_PURCHASES: {
      return {
        ...state,
        purchases: {
          ...state.purchases,
        },
      };
    }
    case Consts.GET_USER_PURCHASES_AGGREGATED: {
      return {
        ...state,
        purchases: {
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.GET_USER_PURCHASES_AGGREGATED_SUCCESS: {
      return {
        ...state,
        purchases: {
          Data: action.payload,
          IsProcessing: false,
          Error: undefined,
        },
      };
    }
    case Consts.GET_USER_PURCHASES_AGGREGATED_FAILURE: {
      return {
        ...state,
        purchases: {
          ...state.purchases,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_TOWNS: {
      return {
        ...state,
        towns: {
          ...state.towns,
          IsLoading: true,
          Error: undefined,
        },
      };
    }
    case Consts.GET_TOWNS_SUCCESS: {
      return {
        ...state,
        towns: {
          ...action.payload,
          IsLoading: false,
        },
      };
    }
    case Consts.GET_TOWNS_FAILURE: {
      return {
        ...state,
        towns: {
          ...state.towns,
          IsLoading: false,
          Error: action.error,
        },
      };
    }

    case Consts.GET_USER_SETTINGS: {
      return {
        ...state,
        settings: {
          ...state.settings,
          IsProcessing: true,
          Error: undefined,
        },
      };
    }
    case Consts.GET_USER_SETTINGS_SUCCESS: {
      return {
        ...state,
        settings: {
          ...action.payload,
          IsProcessing: false,
        },
      };
    }
    case Consts.GET_USER_SETTINGS_FAILURE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          IsProcessing: false,
          Error: action.error,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_TOWN: {
      return {
        ...state,
        channels: { ...state.channels, isProcessing: true },
      };
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_TOWN_SUCCESS: {
      return {
        ...state,
        channels: {
          Entities: action.payload,
          isProcessing: false,
        },
      };
    }
    case Consts.GET_MEDIA_CHANNELS_FOR_TOWN_FAILURE: {
      return {
        ...state,
        channels: {
          ...state.channels,
          isProcessing: false,
          Error: action.error,
        },
      };
    }
    default:
      return state;
  }
};
