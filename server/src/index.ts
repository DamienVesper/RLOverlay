import { Webview } from "webview-bun";
import { file, resolve } from "bun";

import { core } from "./core";

export const view = new Webview();

view.setHTML(await file(await resolve(`../src/index.html`, process.cwd())).text());
view.run();
