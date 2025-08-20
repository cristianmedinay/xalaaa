/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import { StorageProvider } from "../../enums";

export class StorageOptions {
  public Provider: StorageProvider = StorageProvider.Internal;

  public Container?: string;

  public ConnectionString?: string;

  public Region?: string;

  public Endpoint?: string;

  public Token?: string;

  public CdnEndpoint?: string;
}
