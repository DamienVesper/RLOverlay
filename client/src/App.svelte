<script lang="ts">
    import { config } from "./config.svelte";
    import { Game } from "./modules/Game.svelte";

    const game = new Game();
</script>

<div class="ui-top-center">
    <div class="title-wrapper">{config.titleText}</div>
    <div class="main-wrapper">
        <div class="team-name-wrapper">{teams[0].name}</div>
        <div class="team-score-wrapper">{teams[0].score}</div>
        <div class="time-wrapper"></div>
        <div class="team-score-wrapper">{teams[1].score}</div>
        <div class="team-name-wrapper">{teams[1].name}</div>
    </div>
</div>
