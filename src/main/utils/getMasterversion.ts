import { app } from "electron";
import * as os from "node:os";


export const getMasterversion = () => {

  const appData = app.getPath('appData');
  if (os.platform() == 'darwin') {
    return `${appData}/minecraft`
  }

  else return new URL(`${appData}/.minecraft`).toString();

}
