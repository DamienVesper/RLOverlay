<script lang="ts">
    import { core } from "../core.svelte";

    const targetName = $derived(core.game.target.slice(0, -2));
    const target = $derived(core.game.players.filter(player => player.name === targetName)[0]);
</script>

<div class={`player-stats-card team-${target?.teamId ?? 0}`} style={`opacity: ${core.game.target !== `` && !core.game.watchingReplay ? 1 : 0};`}>
    <div class="player-card">
        <!-- Future implementation. -->
        <!-- <div class="player-cam"></div> -->
        <div class="player-name">{target?.name ?? `Player`}</div>
        <div class="boost-bar-outer">
            <div class="boost-bar-inner" style={`width: ${target?.boost ?? 0}%`}></div>
        </div>
    </div>
    <div class="player-stats">
        <div>
            <span>Goals</span>
            <span>{target?.stats.goals ?? 0}</span>
        </div>
        <div>
            <span>Shots</span>
            <span>{target?.stats.shots ?? 0}</span>
        </div>
        <div>
            <span>Asst</span>
            <span>{target?.stats.assists ?? 0}</span>
        </div>
        <div>
            <span>Saves</span>
            <span>{target?.stats.saves ?? 0}</span>
        </div>
    </div>
</div>

<style lang="scss">
    .player-stats-card {
        display: flex;

        margin-left: 2.5rem;
        margin-bottom: 1.5rem;

        text-transform: uppercase;
    }

    .player-card {
        width: 300px;

        padding: 4px 24px 4px 24px;
        text-align: right;
        align-self: flex-end;

        border-top-left-radius: 2.5px;
        border-bottom-left-radius: 2.5px;

        font-size: 30px;
        font-weight: 550;

        .player-name {
            line-height: 40px;
        }
    }

    .player-stats {
        display: flex;
        justify-content: flex-start;

        > div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            margin: 2px 14px 8px 14px;

            > span:first-child {
                font-size: 19px;
                font-weight: 525;
                color: #aaaabb;
                letter-spacing: 1px;
                line-height: 24px;
                vertical-align: middle;
            }

            > span:last-child {
                font-weight: 550;
                font-size: 30px;
                line-height: 28px;
                margin-bottom: 5px;
                vertical-align: middle;
            }
        }
    }

    .boost-bar-outer {
        background-color: #000000;
        height: 6px;
        border-radius: 2.5px;
        padding: 0;

        transition: 0.3s;
    }

    .boost-bar-inner {
        background-color: #ffffff;
        border-radius: inherit;
        height: 100%;
 
        transition: 0.3s;
    }

    .team-0 {
        .player-card {
            background: linear-gradient(#6fb5ed 0%, #027dd1 1.6px);
        }

        .player-stats {
            background: linear-gradient(to top, #027dd1 0%, #027dd1 6px, #1d1e23 6px);
        }
    }

    .team-1 {
        .player-card {
            background: linear-gradient(#ffa321 0%, #fc6b21 1.6px);
        }

        .player-stats {
            background: linear-gradient(to top, #fc6b21 0%, #fc6b21 6px, #1d1e23 6px);
        }
    }
</style>
