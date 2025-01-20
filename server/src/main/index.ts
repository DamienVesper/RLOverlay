import { app, shell, ipcMain, BrowserWindow } from "electron";
import { electronApp, is, optimizer } from "@electron-toolkit/utils";

import icon from "../../resources/icon.png?asset";
import { core } from "./core";

import { join } from "path";
import { config } from "./config";

export let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        autoHideMenuBar: true,
        icon,
        webPreferences: {
            preload: join(__dirname, `../preload/index.js`),
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
        win.webContents.send(`sendSeriesScore`, [...core.game.teams.values()]);
    });

    ipcMain.on(`getTeamData`, () => {
        win.webContents.send(`sendTeamData`, [...core.game.teams.values()]);
    });

    ipcMain.on(`updateServerConfig`, (_e, newConfig: Omit<typeof config, `server` | `host`>) => {
        config.eventText = newConfig.eventText;
        config.seriesText = newConfig.seriesText;
        config.seriesLimit = newConfig.seriesLimit;
    });

    ipcMain.on(`updateSeriesScore`, (_e, teams) => {
        core.game.series[0] = teams[0].score;
        core.game.series[1] = teams[1].score;
    });

    ipcMain.on(`updateTeamData`, (_e, teams) => {
        config.customTeamNames[0] = teams[0].name;
        config.customTeamNames[1] = teams[1].name;
    });

    ipcMain.on(`resetSeriesScore`, () => {
        core.game.clearSeries();
        win.webContents.send(`sendSeriesScore`, [...core.game.teams.values()]);
    });

    ipcMain.on(`resetTeamData`, () => {
        config.customTeamNames[0] = ``;
        config.customTeamNames[1] = ``;

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
