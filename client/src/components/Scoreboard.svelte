<script lang="ts">
    import { config } from "../config.svelte";
    import { core } from "../core.svelte";

    import mvpIcon from "../img/icons/mvp.svg?dataurl";

    const bluePlayers = $derived(core.game.postGameStats.players.filter(player => player.teamId === 0));
    const orangePlayers = $derived(core.game.postGameStats.players.filter(player => player.teamId === 1));

    const blueTeam = $derived(core.game.postGameStats.teams[0]);
    const orangeTeam = $derived(core.game.postGameStats.teams[1]);

    const series = $derived(core.game.postGameStats.series);

    // This needs to be refactored into something more performant and cleaner.
    const blueStats = $derived({
        score: bluePlayers.map(x => x.stats.score).reduce((a, b) => a + b),
        goals: bluePlayers.map(x => x.stats.goals).reduce((a, b) => a + b),
        assists: bluePlayers.map(x => x.stats.assists).reduce((a, b) => a + b),
        shots: bluePlayers.map(x => x.stats.shots).reduce((a, b) => a + b),
        saves: bluePlayers.map(x => x.stats.saves).reduce((a, b) => a + b),
        demos: bluePlayers.map(x => x.stats.demos).reduce((a, b) => a + b),
        touches: bluePlayers.map(x => x.stats.touches).reduce((a, b) => a + b),
    });

    const orangeStats = $derived({
        score: orangePlayers.map(x => x.stats.score).reduce((a, b) => a + b),
        goals: orangePlayers.map(x => x.stats.goals).reduce((a, b) => a + b),
        assists: orangePlayers.map(x => x.stats.assists).reduce((a, b) => a + b),
        shots: orangePlayers.map(x => x.stats.shots).reduce((a, b) => a + b),
        saves: orangePlayers.map(x => x.stats.saves).reduce((a, b) => a + b),
        demos: orangePlayers.map(x => x.stats.demos).reduce((a, b) => a + b),
        touches: orangePlayers.map(x => x.stats.touches).reduce((a, b) => a + b),
    });

    const totalStats = $derived({
        score: blueStats.score + orangeStats.score,
        goals: blueStats.goals + orangeStats.goals,
        assists: blueStats.assists + orangeStats.assists,
        shots: blueStats.shots + orangeStats.shots,
        saves: blueStats.saves + orangeStats.saves,
        demos: blueStats.demos + orangeStats.demos,
        touches: blueStats.touches + orangeStats.touches,
    });
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
                    <span>{config.customTeamNames[0] || blueTeam.name} leads {series[0]}-{series[1]}</span>
                {:else}
                    <span>{config.customTeamNames[1] || orangeTeam.name} leads {series[1]}-{series[0]}</span>
                {/if}
            </div>
        </div>
        <div class="player-names">
            <div class="blue-team">
                <div class="padding"></div>
                <div>
                    {#each bluePlayers as player}
                        <div>
                            <img src={mvpIcon} alt="MVP icon" style={`opacity: ${player.id === core.game.mvp.id ? 1 : 0}`}>
                            <span>{player.name}</span>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="orange-team">
                <div>
                    {#each orangePlayers as player}
                        <div>
                            <img src={mvpIcon} alt="MVP icon" style={`opacity: ${player.id === core.game.mvp.id ? 1 : 0}`}>
                            <span>{player.name}</span>
                        </div>
                    {/each}
                </div>
                <div class="padding"></div>
            </div>
        </div>
    </div>
    <div class="score-table">
        <div class="blue-team">
            {#each bluePlayers as player}
                <div>
                    <div>{player.stats.score}</div>
                    <div>{player.stats.goals}</div>
                    <div>{player.stats.assists}</div>
                    <div>{player.stats.shots}</div>
                    <div>{player.stats.saves}</div>
                    <div>{player.stats.demos >= 7 ? Math.floor(player.stats.demos / 7) : player.stats.demos}</div>
                    <div>{player.stats.touches}</div>
                </div>
            {/each}
        </div>
        <div class="sliders">
            {#each Object.entries(totalStats) as [key, stats]}
                <div>
                    <span>{key}</span>
                    <div>
                        {#if stats === 0}
                            <div class="slider-blue" style={`width: calc(50% - 2.5px)`}></div>
                            <div class="slider-tick"></div>
                            <div class="slider-orange" style={`width: calc(50% - 2.5px)`}></div>
                        {:else}
                            <div class="slider-blue" style={`width: calc(${100 * blueStats[key as keyof typeof blueStats] / stats}% - 2.5px)`}></div>
                            <div class="slider-tick"></div>
                            <div class="slider-orange" style={`width: calc(${100 * orangeStats[key as keyof typeof orangeStats] / stats}% - 2.5px)`}></div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div class="orange-team">
            {#each orangePlayers as player}
                <div>
                    <div>{player.stats.score}</div>
                    <div>{player.stats.goals}</div>
                    <div>{player.stats.assists}</div>
                    <div>{player.stats.shots}</div>
                    <div>{player.stats.saves}</div>
                    <div>{player.stats.demos >= 7 ? Math.floor(player.stats.demos / 7) : player.stats.demos}</div>
                    <div>{player.stats.touches}</div>
                </div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .scorebug span {
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.9);
    }

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
            background: radial-gradient(circle at 50% 50%, hsl(240, 16%, 9%) 0% 15%, #027dd1 150%);
            mask-image: linear-gradient(to left, #00000000 0%, #00000000 50%, #000000ff 50%, #000000ff 100%);
        }

        .bg-right {
            background: radial-gradient(circle at 50% 50%, hsl(240, 16%, 9%) 0% 15%, #fc6b21 150%);
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
            text-transform: uppercase;

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

    .player-names {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;

        > div {
            display: flex;
            width: 780px;

            > div {
                text-transform: uppercase;
                font-size: 28px;
                font-weight: 600;

                margin-bottom: 10px;
            }

            > div:not(.padding) {
                display: flex;
                flex-grow: 1;

                > div {
                    display: flex;
                    flex-direction: column;
                    flex-basis: 100%;
                    text-align: center;

                    img {
                        height: 40px;
                        filter: invert(84%) sepia(42%) saturate(3013%) hue-rotate(348deg) brightness(102%) contrast(107%);
                    }
                }
            }
        }

        .blue-team {
            border-bottom: 5px solid #027dd1;

            .padding {
                margin-left: 50px;
            }
        }

        .orange-team {
            border-bottom: 5px solid #fc6b21;

            .padding {
                margin-right: 50px;
            }
        }
    }

    .score-table {
        display: flex;

        background: #1d1d23;
        padding: 0px 50px;

        height: calc(100% - 305px);
        width: 100%;

        > div:not(.sliders) {
            display: flex;

            width: 750px;
            height: 100%;

            > div {
                flex-basis: 100%;
                text-align: center;

                font-weight: 600;
                font-size: 40px;

                > div {
                    padding: 8px 0px;
                    border-bottom: 5px solid #00000080;
                }
            }
        }

        .sliders {
            display: flex;
            flex-direction: column;

            width: 370px;
            height: 100%;

            > div {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;

                font-size: 36px;
                font-weight: 500;
                letter-spacing: 1.15px;
                text-transform: uppercase;
                text-align: center;

                color: #aaaaaa;
                width: 100%;
                height: 81px;

                > div {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    position: relative;

                    bottom: -5px;

                    .slider-blue {
                        background: #027dd1;
                        height: 5px;
                    }

                    .slider-tick {
                        background: #ffffff;
                        width: 5px;
                        height: 15px;
                    }

                    .slider-orange {
                        background: #fc6b21;
                        height: 5px;
                    }
                }
            }
        }
    }
</style>
