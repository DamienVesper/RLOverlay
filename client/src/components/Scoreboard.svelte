<script lang="ts">
    import { config } from "../config.svelte";
    import { core } from "../core.svelte";

    const bluePlayers = $derived(core.game.postGameStats.players.filter(player => player.teamId === 0));
    const orangePlayers = $derived(core.game.postGameStats.players.filter(player => player.teamId === 1));

    const blueTeam = $derived(core.game.postGameStats.teams[0]);
    const orangeTeam = $derived(core.game.postGameStats.teams[1]);

    const series = $derived(core.game.postGameStats.series);
</script>

<div class="scoreboard">
    <div class="scorebug">
        <div class="bg-left"></div>
        <div class="bg-right"></div>
        <div class="title-wrapper">
            <span>
                <!-- need to filter for xss -->
                {@html config.titleText.replaceAll(`|`, `<span style="font-weight: normal; margin-left: 6.5px; margin-right: 6.5px;">|</span>`)}
            </span>
        </div>
        <div class="main-wrapper">
            <div class="team-name-wrapper">
                <div></div>
                <span>
                    <span>{config.customTeamNames[0] || blueTeam?.name || `BLUE`}</span>
                </span>
            </div>
            <div class="score-wrapper">
                <span>{blueTeam?.score ?? 0}</span>
            </div>
            <div class="game-wrapper">
                <span>Game {series.reduce((a, b) => a + b)}</span>
                <span>BO{config.seriesLimit === 0 ? ` Unlimited` : config.seriesLimit}</span>
            </div>
            <div class="score-wrapper">
                <span>{orangeTeam?.score ?? 0}</span>
            </div>
            <div class="team-name-wrapper">
                <div></div>
                <span>
                    <span>{config.customTeamNames[1] || orangeTeam?.name || `ORANGE`}</span>
                </span>
            </div>
        </div>
        <div class="series-wrapper">
            <div class="series-text">
                {#if series[0] === series[1]}
                    <span>Tied {series[0]}-{series[1]}</span>
                {:else if series[0] > series[1]}
                    <span>{blueTeam.name} leads {series[0]}-{series[1]}</span>
                {:else}
                    <span>{orangeTeam.name} leads {series[1]}-{series[0]}</span>
                {/if}
            </div>
        </div>
    </div>
    <div class="score-table">
        {#each bluePlayers as player}
            <div>{player.name}</div>
            <div>{player.stats.score}</div>
            <div>{player.stats.goals}</div>
            <div>{player.stats.assists}</div>
            <div>{player.stats.shots}</div>
            <div>{player.stats.saves}</div>
            <div>{player.stats.demos}</div>
        {/each}
        <div class="simple-bars"></div>
        {#each orangePlayers as player}
            <div>{player.name}</div>
            <div>{player.stats.score}</div>
            <div>{player.stats.goals}</div>
            <div>{player.stats.assists}</div>
            <div>{player.stats.shots}</div>
            <div>{player.stats.saves}</div>
            <div>{player.stats.demos}</div>
        {/each}
    </div>
</div>

<style lang="scss">
    .scoreboard {
        width: 100%;
        height: 100%;
    }

    .scorebug {
        width: 100%;
        height: 305px;
        color: #fff;

        .bg-left,
        .bg-right {
            position: absolute;
            width: 100%;
            height: 305px;
            z-index: -1;
        }

        .bg-left {
            background: radial-gradient(circle at 50% 50%, hsl(240, 16%, 9%) 0% 15%, #027dd1 200%);
            mask-image: linear-gradient(to left, #00000000 0%, #00000000 50%, #000000ff 50%, #000000ff 100%);
        }

        .bg-right {
            background: radial-gradient(circle at 50% 50%, hsl(240, 16%, 9%) 0% 15%, #fc6b21 200%);
            mask-image: linear-gradient(to right, #00000000 0%, #00000000 50%, #000000ff 50%, #000000ff 100%);
        }

        .title-wrapper,
        .main-wrapper,
        .series-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
        }

        .title-wrapper {
            // background: hsl(240, 16%, 9%);

            color: hsl(213, 35%, 69%);
            text-transform: uppercase;

            span {
                text-align: center;
                vertical-align: middle;
                font-size: 30px;
                font-weight: 575;
            }
        }

        .main-wrapper {
            margin-top: 0.5rem;
        }

        .team-name-wrapper {
            flex-direction: column;
            width: 780px;

            > * {
                width: 100%;
            }

            > span {
                display: flex;
                align-items: center;

                font-size: 56px;
                font-weight: 550;

                padding: 16px;
                height: 92px;

                background: linear-gradient(to bottom, #000000aa 0%, #00000066 100%);
            }
        }

        .team-name-wrapper:nth-child(1) {
            > div {
                background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);
                height: 8px;
            }

            > span {
                border-top-right-radius: 5px;
                justify-content: flex-end;
            }
        }

        .team-name-wrapper:nth-child(5) {
            > div {
                background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);
                height: 8px;
            }

            > span {
                border-top-left-radius: 5px;
            }
        }

        .score-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 72px;
            font-weight: 550;
            width: 95px;
            height: 100px;
            padding: 0px 1rem;
        }

        .score-wrapper:nth-child(2) {
            background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);
        }

        .score-wrapper:nth-child(4) {
            background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);
        }

        .game-wrapper {
            font-weight: 550;
            text-transform: uppercase;

            padding: 0px 8px;

            background: linear-gradient(to bottom, hsl(220, 15%, 23%) 0%, #1a1c22 1.6px);

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 170px;
            height: 100px;

            > span:first-child {
                font-size: 36px;
                line-height: 36px;
            }

            > span:last-child {
                font-size: 24px;
                line-height: 24px;
                color: #aaaabb;
            }
        }
    }

    .series-wrapper {
        color: #dee2e6;
        background: linear-gradient(to bottom, #00000088 0%, #00000000 100%);

        .series-text {
            padding: 4px;
            height: 40px;

            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            transition: 0.3s;

            > span {
                text-transform: uppercase;
                font-weight: 525;
                font-size: 30px;
                line-height: 24px;
            }
        }
    }

    .score-table {
        background: #1d1d23;
        height: 100%;        
    }
</style>
