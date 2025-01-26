<script lang="ts">
    import { config } from "../config.svelte";
    import { core } from "../core.svelte";

    import { animateTopBar } from "../utils/animate";
    import { formatTime } from "../utils/utils";

    const time = $derived(formatTime(core.game.time));

    let initialized = $state(false);
    $effect(() => {
        if (!initialized && core.game.initialized) {
            initialized = true;
            animateTopBar(0);
        }
    });
</script>

<div class="scorebug">
    <div class="title-wrapper">
        <span class="text-animatable">
            <!-- need to filter for xss -->
            {@html config.titleText.replaceAll(`|`, `<span style="font-weight: normal; margin-left: 6.5px; margin-right: 6.5px;">|</span>`)}
        </span>
    </div>
    <div class="scorebug-main-wrapper">
        <div class="team-name-wrapper">
            <div></div>
            <span>
                <span class="text-animatable">{config.customTeamNames[0] || core.game.teams[0]?.name || `BLUE`}</span>
            </span>
        </div>
        <div class="score-wrapper">
            <span class="text-animatable">{core.game.teams[0]?.score ?? 0}</span>
        </div>
        <div class="timer-wrapper">
            <span class="text-animatable">{core.game.isOT ? `+${time}` : time}</span>
        </div>
        <div class="score-wrapper">
            <span class="text-animatable">{core.game.teams[1]?.score ?? 0}</span>
        </div>
        <div class="team-name-wrapper">
            <div></div>
            <span>
                <span class="text-animatable">{config.customTeamNames[1] || core.game.teams[1]?.name || `ORANGE`}</span>
            </span>
        </div>
    </div>
    <div class="series-wrapper">
        <div class="series-indicator">
            {#each { length: Math.ceil(config.seriesLimit / 2) } as _, i}
                <div class={core.game.series[0] > i ? `series-blue` : `series-empty`}><div></div></div>
            {/each}
        </div>
        <div class={`series-text ${core.game.isOT ? `series-text-red` : `series-text-black`}`}>
            <span class={`text-animatable ${config.seriesText === `GAME {{game}} | BEST OF {{bo}}` ? `series-text-default` : `series-text-custom` }`}>
                {#if config.seriesText === `GAME {{game}} | BEST OF {{bo}}`}
                    <span>Game {core.game.series.reduce((a, b) => a + b) + 1}</span>
                    <span>|</span>
                    {#if core.game.isOT}
                        <span>Overtime</span>
                    {:else}
                        <span>Best <span class="scorebug-small"><span>of</span></span> {config.seriesLimit === 0 ? `Unlimited` : config.seriesLimit}</span>
                    {/if}
                {:else}
                    {config.seriesText
                        .replaceAll(`{{game}}`, (core.game.series.reduce((a, b) => a + b) + 1).toString())
                        .replaceAll(`{{bo}}`, config.seriesLimit === 0 ? `Unlimited` : config.seriesLimit.toString())
                    }
                {/if}
            </span>
        </div>
        <div class="series-indicator">
            {#each { length: Math.ceil(config.seriesLimit / 2) } as _, i}
                <div class={core.game.series[1] > i ? `series-orange` : `series-empty`}><div></div></div>
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .scorebug-main-wrapper span {
        text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.9);
    }

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

        span {
            text-align: center;
            vertical-align: middle;
            font-size: 26px;
            font-weight: 575;
            letter-spacing: 1.15px;
        }
    }

    .scorebug-main-wrapper {
        > div {
            display: flex;
            height: 100%;
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
            transform-origin: center right;

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
            transform-origin: center left;

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
            width: 80px;
            height: 71px;
            padding: 0px 1rem;
        }

        .score-wrapper:nth-child(2) {
            background: linear-gradient(to bottom, #6fb5ed 0%, #027dd1 1.6px);
            transform-origin: center right;
        }

        .score-wrapper:nth-child(4) {
            background: linear-gradient(to bottom, #ffa321 0%, #fc6b21 1.6px);
            transform-origin: center left;
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
        transform-origin: top center;

        .series-indicator {
            align-self: flex-start;
            padding: 4px 4px;

            display: flex;
            background: #1a1c22;
            width: 325px;

            div {
                width: 45px;
                height: 10px;

                border-radius: 2.5px;

                margin-right: 5px;
                margin-left: 5px;
            }

            .series-empty, .series-blue, .series-orange {
                background: #000000;
                display: flex;

                > div {
                    width: 100%;
                    height: 100%;
                    padding: 0;
                    margin: 0;
                }
            }

            .series-blue {
                flex-direction: row-reverse;
                div {
                    background: #027dd1;
                }
            }

            .series-orange > div {
                background: #fc6b21;
            }
        }

        .series-indicator:nth-child(1) {
            flex-direction: row-reverse;
            border-bottom-left-radius: 5px;
            transform-origin: center right;
        }

        .series-indicator:nth-child(3) {
            border-bottom-right-radius: 5px;
            transform-origin: center left;
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
                justify-content: space-evenly;

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
