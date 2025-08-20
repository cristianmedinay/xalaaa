/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IUserInfoModel } from "../../models";
import * as UserConsts from "../user/consts";

import * as Consts from "./consts";
import { AuthActionsTypes, IAuthState } from "./types";

export const initialState: IAuthState = {
  isAnonymous: true,
  isAuthenticated: false,
  isLoading: false,
  isProcessing: false,
  isTokenValid: false,
};

export const authReducer = (
  state = initialState,
  action: AuthActionsTypes
): IAuthState => {
  state.action = action;

  switch (action.type) {
    case Consts.SIGN_IN:
    case Consts.SIGN_IN_ANONYMOUS: {
      return {
        ...state,
        error: undefined,
        isLoading: true,
      };
    }
    case Consts.SIGN_IN_SUCCESS: {
      const user = action.payload.user;
      const didomiData = action.payload.didomiData;

      if (didomiData && user) {
        user.DidomiData = didomiData;
      }
      return {
        ...state,
        user,
        session: action.payload.session,
        error: undefined,
        isAnonymous: false,
        isAuthenticated: true,
        isLoading: false,
      };
    }
    case Consts.SIGN_IN_ANONYMOUS_SUCCESS: {
      const user = action.payload.user;
      const didomiData = action.payload.didomiData;

      if (didomiData && user) {
        user.DidomiData = didomiData;
      }
      return {
        ...state,
        user,
        session: action.payload.session,
        error: initialState.error,
        isAnonymous: true,
        isAuthenticated: false,
        isLoading: false,
      };
    }
    case Consts.SET_AUTHENTICATED: {
      return {
        ...state,
      };
    }
    case Consts.SIGN_IN_FAILURE:
    case Consts.SIGN_IN_ANONYMOUS_FAILURE: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case Consts.SIGN_OUT_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        session: undefined,
        user: action?.anonymousUser,
      };
    }
    case Consts.REFRESH_TOKEN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        session: undefined,
        user: undefined,
      };
    }
    case Consts.REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        session: action.payload.session,
        user: action.payload.user,
      };
    }
    case Consts.CHANGE_PASSWORD: {
      return {
        ...state,
        changePasswordResult: undefined,
        error: undefined,
        isProcessing: true,
      };
    }
    case Consts.CHANGE_PASSWORD_SUCCESS: {
      return {
        ...state,
        changePasswordResult: action.payload,
        error: undefined,
        isProcessing: false,
      };
    }
    case Consts.CHANGE_PASSWORD_FAILURE: {
      return {
        ...state,
        error: action.error,
        isProcessing: false,
      };
    }
    case Consts.REGISTER_EMAIL: {
      return {
        ...state,
        error: undefined,
        isProcessing: true,
      };
    }
    case Consts.REGISTER_EMAIL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
        isProcessing: false,
      };
    }
    case Consts.REGISTER_EMAIL_FAILURE: {
      return {
        ...state,
        error: action.error,
        isProcessing: false,
      };
    }
    case Consts.SYNC_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case Consts.REFRESH_USER: {
      const user: IUserInfoModel = {
        Id: -1,
        ...state.user,
        FullName: action.payload.FullName,
        AvatarUrl: action.payload.AvatarUrl,
      };
      return {
        ...state,
        user,
      };
    }
    case Consts.RESET_PASSWORD: {
      return {
        ...state,
        isProcessing: true,
      };
    }
    case Consts.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        isProcessing: false,
      };
    }
    case Consts.RESET_PASSWORD_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: action.error,
      };
    }
    case Consts.RESET_PASSWORD_LINK: {
      return {
        ...state,
        isProcessing: true,
      };
    }
    case Consts.RESET_PASSWORD_LINK_SUCCESS: {
      return {
        ...state,
        isProcessing: false,
      };
    }
    case Consts.RESET_PASSWORD_LINK_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        error: action.error,
      };
    }
    case Consts.VALIDATE_TOKEN: {
      return {
        ...state,
        isProcessing: true,
        isTokenValid: undefined,
      };
    }
    case Consts.VALIDATE_TOKEN_SUCCESS: {
      return {
        ...state,
        isProcessing: false,
        isTokenValid: true,
      };
    }
    case Consts.VALIDATE_TOKEN_FAILURE: {
      return {
        ...state,
        isProcessing: false,
        isTokenValid: false,
        error: action.error,
      };
    }
    case Consts.REGISTER_CONFIRM_EMAIL: {
      return {
        ...state,
        error: undefined,
        isProcessing: true,
      };
    }
    case Consts.REGISTER_CONFIRM_EMAIL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
        error: undefined,
        isProcessing: false,
      };
    }
    case Consts.REGISTER_CONFIRM_EMAIL_FAILURE: {
      return {
        ...state,
        error: action.error,
        isProcessing: false,
      };
    }
    case UserConsts.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        user: {
          ...state.user,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          Id: state.user?.Id!,
          Products: action.payload,
        },
      };
    }

    default:
      return state;
  }
};
