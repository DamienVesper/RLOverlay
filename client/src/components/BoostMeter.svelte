<script lang="ts">
    import { core } from "../core.svelte";

    const boost = $derived(core.game.players[parseInt(core.game.target?.slice(-1) ?? 0)]?.boost ?? 0);
</script>

<div class="target-boost-meter">
    <div class="target-boost-inner"></div>
</div>

<style lang="scss">
    .target-boost-meter {
        background: #1e90ff;
        border-radius: 50%;

        width: 200px;
        height: 200px;

        margin-bottom: 35px;
        margin-right: 85px;
    }
</style>
