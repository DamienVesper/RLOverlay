<script lang="ts">
    import { onMount } from "svelte";

    import Scorebug from "./components/Scorebug.svelte";

    import Replay from "./components/Replay.svelte";
    import Scoreboard from "./components/Scoreboard.svelte";

    import { animateTopBar } from "./utils/animate";

    import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
    import "./lib/css/main.scss";
    
    onMount(() => {
        animateTopBar(0);
    });
</script>

<div class="ui-top-left"></div>
<div class="ui-top-center">
    <Scorebug />
</div>
<div class="ui-top-right"></div>
<div class="ui-bottom-left"></div>
<div class="ui-bottom-right"></div>

<div class="ui-replay">
    <Replay />
</div>
<div class="ui-scoreboard">
    <Scoreboard />
</div>

<style>
    .ui-top-left,
    .ui-top-center,
    .ui-top-right,
    .ui-bottom-left,
    .ui-bottom-right {
        position: absolute;
    }

    .ui-top-center {
        top: 0;
        left: 50%;

        transform: translate(-50%);
    }
</style>
