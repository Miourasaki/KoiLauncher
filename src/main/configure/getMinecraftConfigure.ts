import fs from "node:fs";
import { getMasterversion } from "../utils/getMasterversion";

const mainDir = getMasterversion()

export const getMinecraftConfigure = (_: Electron.IpcMainEvent,
                                        dir:string = mainDir) => {

  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    else {

      console.log(2);

    }
  })

}
