<script lang="ts">
    import { core } from "../core.svelte";

    const formatTime = (time: number) => {
        const second = (time % 60).toString().padStart(2, `0`);
        const minute = Math.floor(time / 60);
        const hour = Math.floor(time / 3600);

        const min = hour > 0 ? minute.toString().padStart(2, `0`) : `${minute}`;

        return time > 3600
            ? `${hour}:${min}:${second}`
            : `${min}:${second}`;
    };

    const time = $derived(formatTime(core.game.time));
</script>

<div class="title-wrapper">
    <span>{core.titleText}</span>
</div>
<div class="scorebug-wrapper">
    <div class="team-name-wrapper">
        <span>{core.game.teams.get(0)?.customName || core.game.teams.get(0)?.name || `BLUE`}</span>
    </div>
    <div class="timer-wrapper">
        <span>{core.game.isOT ? `+${time}` : time}</span>
    </div>
    <div class="team-name-wrapper">
        <span>{core.game.teams.get(1)?.customName || core.game.teams.get(1)?.name || `ORANGE`}</span>
    </div>
</div>
<div class="series-wrapper">
    <div class="series-indicator"></div>
    <div class="series-text">
        <span>{core.seriesText}</span>
    </div>
    <div class="series-indicator"></div>
</div>
