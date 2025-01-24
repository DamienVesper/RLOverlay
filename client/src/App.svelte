<script lang="ts">
    import BoostMeter from "./components/BoostMeter.svelte";
    import Scorebug from "./components/Scorebug.svelte";

    import Replay from "./components/Replay.svelte";
    import Scoreboard from "./components/Scoreboard.svelte";
    import PlayerStats from "./components/PlayerStats.svelte";
    import PlayerBar from "./components/PlayerBar.svelte";

    import { core } from "./core.svelte";

    import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
    import "./lib/css/main.scss";
</script>

{#if window.location.pathname === `/`}
    <div class="ui-top-left">
        <div class="player-boost-bars">
            {#each core.game.players.filter(player => player.teamId === 0) as player}
                <PlayerBar player={player} />
            {/each}
        </div>
    </div>
    <div class="ui-top-center">
        <Scorebug />
    </div>
    <div class="ui-top-right">
        <div class="player-boost-bars">
            {#each core.game.players.filter(player => player.teamId === 1) as player}
                <PlayerBar player={player} />
            {/each}
        </div>
    </div>
    <div class="ui-bottom-left">
        <PlayerStats />
    </div>
    <div class="ui-bottom-right">
        <BoostMeter />
    </div>

    <div class="ui-replay">
        <Replay />
    </div>
    <div class="ui-scoreboard">
        <Scoreboard />
    </div>
{:else if window.location.pathname === `/stats`}
{/if}

<style>
    .ui-top-left,
    .ui-top-center,
    .ui-top-right,
    .ui-bottom-left,
    .ui-bottom-right,
    .ui-replay,
    .ui-scoreboard {
        position: absolute;
    }

    .ui-top-left {
        top: 0;
        left: 0;
    }

    .ui-top-center {
        top: 0;
        left: 50%;

        transform: translate(-50%);
    }

    .ui-top-right {
        top: 0;
        right: 0;
    }

    .ui-bottom-left {
        bottom: 0;
        left: 0;
    }

    .ui-bottom-right {
        bottom: 0;
        right: 0;
    }

    .player-boost-bars {
        margin-top: 1rem;
    }

    .ui-replay {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
</style>
