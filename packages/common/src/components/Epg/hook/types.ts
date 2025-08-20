/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { EpgChannel, EpgProgram } from "../types";

export interface EpgLoaderValue {
  isLoading: boolean;
  programs: EpgProgram[];
  channels: EpgChannel[];
  load: (day: Date) => void;
}
