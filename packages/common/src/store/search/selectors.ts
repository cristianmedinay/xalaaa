/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { IAppState } from "../types";

const searchFilterSelector = (state: IAppState) => state.search?.filter;

export const Selectors = {
  searchFilterSelector,
};
