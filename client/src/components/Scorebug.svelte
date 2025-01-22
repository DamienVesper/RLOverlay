<script lang="ts">
    import { config } from "../config.svelte";
    import { core } from "../core.svelte";

    const formatTime = (time: number) => {
        const second = (time % 60).toString().padStart(2, `0`);
        const minute = Math.floor(time / 60) % 60;
        const hour = Math.floor(time / 3600);

        const min = hour > 0 ? minute.toString().padStart(2, `0`) : `${minute}`;

        return time > 3600
            ? `${hour}:${min}:${second}`
            : `${min}:${second}`;
    };

    const time = $derived(formatTime(core.game.time));
</script>

<div class="scorebug">
    <div class="title-wrapper">
        {@html config.titleText.replace(`|`, `<span style="font-weight: normal; margin-left: 6.5px; margin-right: 6.5px;">|</span>`)}
    </div>
    <div class="scorebug-main-wrapper">
        <div class="team-name-wrapper">
            <div></div>
            <span>
                <span>{config.customTeamNames[0] || core.game.teams[0]?.name || `BLUE`}</span>
            </span>
        </div>
        <div class="score-wrapper">
            <span>{core.game.teams[0]?.score ?? 0}</span>
        </div>
        <div class="timer-wrapper">
            <span>{core.game.isOT ? `+${time}` : time}</span>
        </div>
        <div class="score-wrapper">
            <span>{core.game.teams[1]?.score ?? 0}</span>
        </div>
        <div class="team-name-wrapper">
            <div></div>
            <span>
                <span>{config.customTeamNames[1] || core.game.teams[1]?.name || `BLUE`}</span>
            </span>
        </div>
    </div>
    <div class="series-wrapper">
        <div class="series-indicator">
            {#each { length: Math.ceil(core.game.seriesLimit / 2) } as _, i}
                <div class={core.game.series[0] > i ? `series-blue` : `series-empty`}></div>
            {/each}
        </div>
        <div class={`series-text ${core.game.isOT ? `series-text-red` : `series-text-black`}`}>
            <span class={config.seriesText === `GAME {{game}} | BEST OF {{bo}}` ? `series-text-default` : `series-text-custom` }>
                {#if config.seriesText === `GAME {{game}} | BEST OF {{bo}}`}
                    <span>Game {core.game.series.reduce((a, b) => a + b) + 1}</span>
                    <span>|</span>
                    {#if core.game.isOT}
                        <span>Overtime</span>
                    {:else}
                        <span>Best <span class="scorebug-small"><span>of</span></span> {config.seriesLimit === 0 ? `Unlimited` : config.seriesLimit.toString()}</span>
                    {/if}
                {:else}
                    {config.seriesText
                        .replace(`{{game}}`, (core.game.series.reduce((a, b) => a + b) + 1).toString())
                        .replace(`{{bo}}`, config.seriesLimit === 0 ? `Unlimited` : config.seriesLimit.toString())
                    }
                {/if}
            </span>
        </div>
        <div class="series-indicator">
            {#each { length: Math.ceil(core.game.seriesLimit / 2) } as _, i}
                <div class={core.game.series[0] > i ? `series-orange` : `series-empty`}></div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .scorebug {
        text-transform: uppercase;
        color: #ffffff;
    }

    .scorebug > div {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .title-wrapper {
        background: hsl(240, 16%, 9%);

        color: hsl(213, 35%, 69%);
        text-transform: uppercase;

        text-align: center;
        vertical-align: middle;
        font-size: 28px;
        font-weight: 575;
        letter-spacing: 1.15px;
    }

    .scorebug-main-wrapper {
        > div {
            height: 100%;
            display: flex;
        }

        .team-name-wrapper {
            flex-direction: column;
            width: 325px;

            > * {
                width: 100%;
            }

            > span {
                display: flex;
                justify-content: center;
                align-items: center;

                font-size: 30px;
                font-weight: 550;

                padding: 16px;

                height: 63px;
            }
        }

        .team-name-wrapper:nth-child(1) {
            background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);

            > div {
                background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);
                height: 8px;
            }

            > span {
                background: linear-gradient(185deg, hsl(240, 16%, 9%) 0%, #1d1e23 20%, #027dd1 120%, #2c5874 150%);
                border-top-right-radius: 5px;
            }
        }

        .team-name-wrapper:nth-child(5) {
            background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);

            > div {
                background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);
                height: 8px;
            }

            > span {
                background: linear-gradient(-185deg, hsl(240, 16%, 9%) 0%, #1d1e23 20%, #fc6b21 120%, #7e4b35 100%);
                border-top-left-radius: 5px;
            }
        }

        .score-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: 50px;
            font-weight: 550;
            // height: 83px;
            // width: 80px;
            width: 80px;
            height: 71px;
            padding: 0px 1rem;
        }

        .score-wrapper:nth-child(2) {
            background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);
        }

        .score-wrapper:nth-child(4) {
            background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);
        }

        .timer-wrapper {
            font-size: 50px;
            font-weight: 550;

            padding: 0px 8px;

            background: linear-gradient(to bottom, hsl(220, 15%, 23%) 0%, #1a1c22 1.6px);
            letter-spacing: 5px;

            display: flex;
            justify-content: center;
            align-items: center;

            width: 200px;
            height: 71px;
        }
    }

    .series-wrapper {
        color: #dee2e6;

        .series-indicator {
            background: #1a1c22;

            .series-blue {

            }
        }

        .series-text {
            font-weight: 550;
            font-size: 20px;

            width: 360px;

            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;

            transition: 0.3s;

            .series-text-default {
                display: flex;

                > span:first-child, > span:last-child {
                    flex-grow: 1;
                }

                > span:nth-child(3) {
                    .scorebug-small {
                        font-size: 12px;
                    }
                }
            }
        }

        .series-text-red {
            background: linear-gradient(to bottom, #8f1e1e 0%, #de1616 50%, #8f1e1e 100%);
        }

        .series-text-black {
            background: hsl(240, 16%, 9%);
        }
    }
</style>
