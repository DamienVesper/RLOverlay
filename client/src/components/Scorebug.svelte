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
        <span>{config.titleText}</span>
    </div>
    <div class="scorebug-wrapper">
        <div class="team-name-wrapper">
            <span>{config.customTeamNames[0] || core.game.teams[0]?.name || `BLUE`}</span>
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
            <span>{config.customTeamNames[1] || core.game.teams[1]?.name || `BLUE`}</span>
        </div>
    </div>
    <div class="series-wrapper">
        <div class="series-indicator"></div>
        <div class="series-text">
            <span>
                {config.seriesText
                    .replace(`{{game}}`, (core.game.series.reduce((a, b) => a + b) + 1).toString())
                    .replace(`{{bo}}`, config.seriesLimit === 0 ? `UNLIMITED` : config.seriesLimit.toString())
                }
            </span>
        </div>
        <div class="series-indicator"></div>
    </div>
</div>

<style>
    .scorebug > div {
        display: flex;
    }    
</style>
