<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowRightArrowLeft, faRankingStar, faTrash } from "@fortawesome/free-solid-svg-icons";

    import { onMount } from "svelte";
    import "bootstrap";

    import "../../../resources/main.scss";

    const config = $state({
        titleText: ``,
        seriesText: ``,
        seriesLimit: 0
    });

    onMount(() => {
        window.electron.ipcRenderer.on(`sendServerConfig`, (_e, newConfig) => {
            config.titleText = newConfig.titleText;
            config.seriesText = newConfig.seriesText;
            config.seriesLimit = newConfig.seriesLimit;
        });

        window.electron.ipcRenderer.send(`getServerConfig`);
    });

    const updateConfig = (_e: unknown) => {
        window.electron.ipcRenderer.send(`updateServerConfig`, $state.snapshot(config));
    };
</script>

<header>
    <h1 class="text-center mt-3">Vesper's BARL</h1>
</header>
<main class="container">
    <div>
        <h2>Match Info</h2>
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
                    <input type="text" id="series-text" class="form-control" placeholder="Title Text">
                </div>
                <div class="col">
                    <input type="text" id="top-info-text" class="form-control" placeholder="Series Text">
                </div>
            </div>
            <div class="row g-2">
                <div class="col">
                    <button class="btn btn-primary w-100">
                        <FontAwesomeIcon icon={faRankingStar} />
                        Reset Series Score
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-success w-100" disabled>
                        <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                        Switch Teams
                    </button>
                </div>
                <div class="col">
                    <button class="btn btn-danger w-100">
                        <FontAwesomeIcon icon={faTrash} />
                        Reset Team Data
                    </button>
                </div>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
</style>
