<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowRightArrowLeft, faRankingStar, faTrash } from "@fortawesome/free-solid-svg-icons";

    import { onMount } from "svelte";
    import "bootstrap";

    import { Tabs } from "./enums";

    import "../../../resources/main.scss";

    let currentTab = $state<Tabs>(Tabs.MatchInfo);

    const config = $state({
        titleText: ``,
        seriesText: ``,
        seriesLimit: 0,
        enableOBSTransitions: true
    });

    const teams = $state([
        {
            name: ``,
            score: 0
        },
        {
            name: ``,
            score: 0
        }
    ]);

    onMount(() => {
        window.electron.ipcRenderer.on(`sendServerConfig`, (_e, newConfig) => {
            config.titleText = newConfig.titleText;
            config.seriesText = newConfig.seriesText;
            config.seriesLimit = newConfig.seriesLimit;
            config.enableOBSTransitions = newConfig.enableOBSTransitions;
        });

        window.electron.ipcRenderer.on(`sendSeriesScore`, (_e, series) => {
            teams[0].score = series[0];
            teams[1].score = series[1];
        });

        window.electron.ipcRenderer.on(`sendTeamData`, (_e, newTeams) => {
            teams[0].name = newTeams[0].customName;
            teams[1].name = newTeams[1].customName;
        });

        window.electron.ipcRenderer.send(`getServerConfig`);
    });

    const updateConfig = (_e: unknown) => {
        window.electron.ipcRenderer.send(`updateServerConfig`, $state.snapshot(config));
    };

    const resetSeriesScore = (_e: unknown) => {
        window.electron.ipcRenderer.send(`resetSeriesScore`);
    };

    const switchTeamData = (_e: unknown) => {
        teams.reverse();

        updateSeriesScore(void 0);
        updateTeamData(void 0);
    };

    const resetTeamData = (_e: unknown) => {
        teams[0].name = ``;
        teams[1].name = ``;
        window.electron.ipcRenderer.send(`resetTeamData`);
    };

    const updateSeriesScore = (_e: unknown) => {
        teams[0].score = Math.min(Math.max(0, teams[0].score), 99);
        teams[1].score = Math.min(Math.max(0, teams[1].score), 99);

        window.electron.ipcRenderer.send(`updateSeriesScore`, $state.snapshot(teams));
    };

    const updateTeamData = (_e: unknown) => {
        window.electron.ipcRenderer.send(`updateTeamData`, $state.snapshot(teams));
    };
</script>

<header>
    <h1 class="text-center mt-3">Vesper's BARL</h1>
    <p class="text-center form-text">Broadcasting Assistant for Rocket League</p>
</header>
<main class="container">
    <ul class="nav nav-tabs">
        <li class="nav-item">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class={`nav-link ${currentTab === Tabs.MatchInfo ? `active` : ``}`} onclick={(() => { currentTab = Tabs.MatchInfo; })}>Match Info</a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class={`nav-link ${currentTab === Tabs.DisplayOptions ? `active` : ``}`} onclick={(() => { currentTab = Tabs.DisplayOptions; })}>Display Options</a>
        </li>
        <li class="nav-item">
            <!-- svelte-ignore a11y_invalid_attribute -->
            <a href="#" class={`nav-link ${currentTab === Tabs.Help ? `active` : ``}`} onclick={(() => { currentTab = Tabs.Help; })}>Help</a>
        </li>
    </ul>
    <div class="mt-3">
        <div style={`display: ${currentTab === Tabs.MatchInfo ? `block` : `none`}`}>
            <div class="d-grid gap-2">
                <div class="row g-2">
                    <div class="col-3">
                        <div class="input-group">
                            <span class="input-group-text">Best of</span>
                            <select name="" id="" class="form-select" bind:value={config.seriesLimit} onchange={updateConfig}>
                                <option value={3}>3</option>
                                <option value={5}>5</option>
                                <option value={7}>7</option>
                                <option value={9}>9</option>
                                <option value={0}>Unlimited</option>
                            </select>
                        </div>
                    </div>
                    <div class="col">
                        <input type="text" id="series-text" class="form-control" placeholder="Title Text" bind:value={config.titleText} onchange={updateConfig}>
                    </div>
                    <div class="col">
                        <input type="text" id="top-info-text" class="form-control" placeholder="Series Text" bind:value={config.seriesText} onchange={updateConfig}>
                    </div>
                </div>
                <div class="row g-2">
                    <div class="col">
                        <button class="btn btn-primary w-100" onclick={resetSeriesScore}>
                            <FontAwesomeIcon icon={faRankingStar} />
                            Reset Series Score
                        </button>
                    </div>
                    <div class="col">
                        <button class="btn btn-success w-100" onclick={switchTeamData}>
                            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                            Switch Teams
                        </button>
                    </div>
                    <div class="col">
                        <button class="btn btn-danger w-100" onclick={resetTeamData}>
                            <FontAwesomeIcon icon={faTrash} />
                            Reset Team Data
                        </button>
                    </div>
                </div>
                <hr>
            </div>
            <div class="d-grid gap-2 mt-2">
                <div class="row">
                    <div class="col text-center">
                        <h3>Left Team</h3>
                        <hr>
                    </div>
                    <div class="col-2"></div>
                    <div class="col text-center">
                        <h3>Right Team</h3>
                        <hr>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="d-flex">
                            <label for="team-series-score-1">Series Score</label>
                            <input type="number" name="team-series-score-1" class="form-control ms-3" placeholder="0" min={0} max={99} bind:value={teams[0].score} onchange={updateSeriesScore}>
                        </div>
                    </div>
                    <div class="col-2"></div>
                    <div class="col">
                        <div class="d-flex">
                            <label for="team-series-score-2">Series Score</label>
                            <input type="number" name="team-series-score-2" class="form-control ms-3" placeholder="0" min={0} max={99} bind:value={teams[1].score} onchange={updateSeriesScore}>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="d-flex">
                            <label for="team-name-1">Name</label>
                            <input type="text" name="team-name-1" class="form-control ms-3" placeholder="BLUE" bind:value={teams[0].name} onchange={updateTeamData}>
                        </div>
                    </div>
                    <div class="col-2"></div>
                    <div class="col">
                        <div class="d-flex">
                            <label for="team-name-2">Name</label>
                            <input type="text" name="team-name-2" class="form-control ms-3" placeholder="ORANGE" bind:value={teams[1].name} onchange={updateTeamData}>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <div class="text-center">
                <div class="form-text">Series score automatically updates at the end of each game.</div>
                <div class="form-text">Leave team names blank to default to in-game names.</div>
            </div>
        </div>
        <div style={`display: ${currentTab === Tabs.DisplayOptions ? `block` : `none`}`}>
            <div>
                <div class="form-check">
                    <input type="checkbox" id="obs-transitions-config" class="form-check-input" bind:checked={config.enableOBSTransitions} onchange={updateConfig}>
                    <label for="obs-transitions-config" class="form-check-label">Enable automatic scene transitions in OBS.</label>
                </div>
            </div>
        </div>
        <div style={`display: ${currentTab === Tabs.Help ? `block` : `none`}`}>
            <div class="form-text">Contact me on <a href="https://discord.com/users/386940319666667521" target="_blank">Discord</a> if you have any issues.</div>
        </div>
    </div>
</main>

<style lang="scss">
    div label {
        min-width: 100px;
        vertical-align: middle;
    }
</style>
