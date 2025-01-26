<script lang="ts">
    import { core, type Unpacked } from "../core.svelte";
    import type { Game } from "../modules/Game.svelte";

    import goalIcon from "../img/icons/goal.svg?dataurl";
    import shotIcon from "../img/icons/shot.svg?dataurl";
    import assistIcon from "../img/icons/assist.svg?dataurl";
    import saveIcon from "../img/icons/save.svg?dataurl";
    import demoIcon from "../img/icons/demo.svg?dataurl";

    import { StatFeedEvents } from "../../../shared/src/net/SOS";

    const { player }: { player: Unpacked<Game[`players`]> } = $props();

    const playerStatFeed = $derived(core.game.statFeed.filter(x => x.main_target.id === player.id));

    /**
     * Returns the corresponding SVG data for the given event.
     */
    const eventIcon = (event: StatFeedEvents): string => {
        return event === StatFeedEvents.Goal
            ? goalIcon
            : event === StatFeedEvents.Shot
                ? shotIcon
                : event === StatFeedEvents.Assist
                    ? assistIcon
                    : event === StatFeedEvents.Save
                        ? saveIcon
                        : demoIcon;
    };
</script>

<div class={`boost-bar boost-team-${player.teamId} boost-${core.game.target === player.id ? `active` : `inactive`} statfeed-${playerStatFeed.length === 0 ? `inactive` : `active`} statfeed-${playerStatFeed.length}`}>
    <div>
        <div class="player-data">
            <span>{player.name}</span>
            <span>{player.boost}</span>
        </div>
        <div class="boost-bar-outer">
            <div class="boost-bar-inner" style={`width: ${player.boost}%`}></div>
        </div>
    </div>
    <div class="player-statfeed">
        {#if playerStatFeed[0]}
            <img src={eventIcon(playerStatFeed[0].event_name)} alt="Statfeed icon 1">
        {/if}
        {#if playerStatFeed[1]}
            <img src={eventIcon(playerStatFeed[1].event_name)} alt="Statfeed icon 2">
        {/if}
    </div>
</div>

<style lang="scss">
    .boost-bar {
        transition: 0.3s;
        // width: 300px;

        font-size: 26px;
        font-weight: 525;
        text-transform: uppercase;

        background: #1a1c22;
        margin-bottom: 5px;

        padding-bottom: 4px;
        padding-left: 8px;
        padding-right: 8px;

        display: flex;

        > div:first-child {
            width: 300px;
        }

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

        .player-statfeed {
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                height: 28px;
                width: 28px;
                filter: invert(99%) sepia(2%) saturate(0%) hue-rotate(143deg) brightness(115%) contrast(100%);
            }
        }
    }

    .boost-team-0 {
        padding-left: 30px;
        transform-origin: center left;
        margin-right: auto;

        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;

        span:first-child {
            flex-grow: 1;
        }

        .boost-bar-inner {
            background-color: #027dd1;
        }

        .player-statfeed {
            margin-left: 6px;

            img {
                margin-left: 10px;
            }
        }
    }

    .boost-team-1 {
        padding-right: 30px;
        transform-origin: center right;
        margin-left: auto;

        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        > div:last-child {
            order: -1;
        }

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

        .player-statfeed {
            margin-right: 6px;

            img {
                margin-right: 10px;
            }

            img:first-child {
                order: 1;
            }
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

    .statfeed-active {
        .player-data {            
            > span:last-child {
                opacity: 0;        
            }
        }
    }

    .statfeed-active.boost-team-0 {
        background: linear-gradient(to right, #1a1c22 0%, #1a1c22 250px, #027dd1 100%);

        img {
            animation: flyInFromRight ease-in-out 0.1s;
        }
    }

    .statfeed-active.boost-team-1 {
        background: linear-gradient(to left, #1a1c22 0%, #1a1c22 250px, #fc6b21 100%);

        img {
            animation: flyInFromLeft ease-in-out 0.1s;
        }
    }

    .statfeed-0 {
        width: 344px;
    }

    .statfeed-1 {
        width: 382px;
    }

    @keyframes flyInFromLeft {
        0% { opacity: 0; transform: translateX(-100%); }
        100% { opacity: 1; transform: translateX(0); }
    }

    @keyframes flyInFromRight {
        0% { opacity: 0; transform: translateX(100%); }
        100% { opacity: 1; transform: translateX(0); }
    }
</style>
