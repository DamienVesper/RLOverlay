import { app, shell, ipcMain, BrowserWindow } from "electron";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";

import { join } from "path";

import { core } from "./core";
import { config } from "./config";
import { store } from "./store";
import { sendAllInit } from "./server";

import icon from "../../resources/icon.png?asset";

export let win: BrowserWindow;

/**
 * Update the local store with config values.
 */
const updateStore = () => {
    store.set(`titleText`, config.titleText);
    store.set(`seriesText`, config.seriesText);
    store.set(`seriesLimit`, config.seriesLimit);
    store.set(`customTeamName0`, config.customTeamNames[0]);
    store.set(`customTeamName1`, config.customTeamNames[1]);
};

const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        autoHideMenuBar: true,
        icon,
        webPreferences: {
            preload: join(__dirname, `../preload/index.mjs`),
            sandbox: false
        }
    });

    win.on(`ready-to-show`, () => win.show());

    win.webContents.setWindowOpenHandler(details => {
        void shell.openExternal(details.url);
        return { action: `deny` };
    });

    // HMR for renderer base on electron-vite cli.
    // Load the remote URL for development or the local html file for production.
    if (is.dev && process.env.ELECTRON_RENDERER_URL) void win.loadURL(process.env.ELECTRON_RENDERER_URL);
    else void win.loadFile(join(__dirname, `../renderer/index.html`));
};

// This method will be called when Electron has finished initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
void app.whenReady().then(() => {
    // Set app user model ID for Windows.
    electronApp.setAppUserModelId(`com.electron`);

    // Default: allows DevTools in development but not production.
    app.on(`browser-window-created`, (_, window) => optimizer.watchWindowShortcuts(window));

    // IPC.
    ipcMain.on(`getServerConfig`, () => {
        win.webContents.send(`sendServerConfig`, config);
    });

    ipcMain.on(`getSeriesScore`, () => {
        win.webContents.send(`sendSeriesScore`, core.game.series);
    });

    ipcMain.on(`getTeamData`, () => {
        win.webContents.send(`sendTeamData`, [...core.game.teams.values()]);
    });

    ipcMain.on(`updateServerConfig`, (_e, newConfig: Omit<typeof config, `server` | `host`>) => {
        config.titleText = newConfig.titleText;
        config.seriesText = newConfig.seriesText;
        config.seriesLimit = newConfig.seriesLimit;

        updateStore();
        sendAllInit();
    });

    ipcMain.on(`updateSeriesScore`, (_e, teams) => {
        core.game.series[0] = teams[0].score;
        core.game.series[1] = teams[1].score;

        sendAllInit();
    });

    ipcMain.on(`updateTeamData`, (_e, teams) => {
        config.customTeamNames[0] = teams[0].name;
        config.customTeamNames[1] = teams[1].name;

        updateStore();
        sendAllInit();
    });

    ipcMain.on(`resetSeriesScore`, () => {
        core.game.clearSeries();
        sendAllInit();

        win.webContents.send(`sendSeriesScore`, core.game.series);
    });

    ipcMain.on(`resetTeamData`, () => {
        config.customTeamNames[0] = ``;
        config.customTeamNames[1] = ``;

        updateStore();
        sendAllInit();

        win.webContents.send(`sendTeamData`, [...core.game.teams.values()]);
    });

    // Create the window.
    createWindow();

    app.on(`activate`, () => {
        // On macOS it's common to re-create a window in the app when the dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common for applications and their menu bar to stay active until the user quits explicitly with Cmd + Q.
app.on(`window-all-closed`, () => {
    if (process.platform !== `darwin`) app.quit();
});
