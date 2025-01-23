<script lang="ts">
    import { core, type Unpacked } from "../core.svelte";
    import type { Game } from "../modules/Game.svelte";

    export let player: Unpacked<Game[`players`]>;
</script>

<div class={`boost-bar boost-team-${player.teamId} boost-${core.game.target === player.id ? `active` : `inactive`}`}>
    <div class="player-data">
        <span>{player.name}</span>
        <span>{player.boost}</span>
    </div>

    <div class="boost-bar-outer">
        <div class="boost-bar-inner" style={`width: ${player.boost}%`}></div>
    </div>
</div>

<style lang="scss">
    .boost-bar {
        transition: 0.3s;
        width: 300px;

        font-size: 26px;
        font-weight: 525;
        text-transform: uppercase;

        background: #1a1c22;
        margin-bottom: 5px;

        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;

        .player-data {
            display: flex;

            span {
                line-height: 28px;
                margin-left: 2.5px;
                margin-right: 2.5px;
            }
        }

        .boost-bar-outer {
            margin-top: 2.5px;
            height: 6px;
            padding: 0;
            transition: 0.3s;

            border-radius: 2.5px;

            background-color: #000000;
        }

        .boost-bar-inner {
            height: 100%;
            border-radius: inherit;

            transition: 0.3s;
        }
    }

    .boost-team-0 {
        padding-left: 30px;
        transform-origin: center left;

        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        span:first-child {
            flex-grow: 1;
        }

        .boost-bar-inner {
            background-color: #027dd1;
        }
    }

    .boost-team-1 {
        padding-right: 30px;
        transform-origin: center right;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        span:first-child {
            order: 1;
        }

        span:last-child {
            flex-grow: 1;
        }

        .boost-bar-outer {
            display: flex;
            justify-content: flex-end;
        }

        .boost-bar-inner {
            background-color: #fc6b21;
        }
    }

    .boost-active {
        color: #ffffff;

        .boost-bar-inner {
            background-color: #ffffff;
        }
    }

    .boost-active.boost-team-0 {
        background-color: #027dd1;
    }

    .boost-active.boost-team-1 {
        background-color: #fc6b21;
    }
</style>
