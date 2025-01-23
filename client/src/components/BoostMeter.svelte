<script lang="ts">
    import { core } from "../core.svelte";

    const targetName = $derived(core.game.target.slice(0, -2));
    const target = $derived(core.game.players.filter(player => player.name === targetName)[0]);

    const boost = $derived(target?.boost ?? 0);
    const teamId = $derived(target?.teamId ?? 0);

    $effect.pre(() => {
        document.documentElement.style.setProperty(`--bar`, `${(boost * 270 / 100).toFixed(2)}deg`);
    });
</script>

<div class={`boost-meter-wrapper boost-team-${teamId}`} style={`opacity: ${core.game.target !== `` && !core.game.watchingReplay ? 1 : 0};`}>
    <div class="boost-meter-empty"></div>
    <div class="boost-meter" style={``}></div>
    <div class="boost-meter-inner d-flex justify-content-center align-items-center">
        <span>{boost}</span>
    </div>
</div>


<style lang="scss">
    .boost-meter-wrapper {
        border-radius: 50%;

        width: 200px;
        height: 200px;

        margin-bottom: 35px;
        margin-right: 85px;

        transition: 0.1s;
    }

    .boost-meter, .boost-meter-empty {
        position: absolute;

        transform: rotate(-180deg);

        top: 5px;
        left: 5px;

        border-radius: 50%;

        width: 190px;
        height: 190px;
    }

    .boost-meter-empty {
        background: conic-gradient(#00000080 0deg, #00000080 270deg, #00000000 270deg, #00000000 0deg);
        mask-image: radial-gradient(#00000000 74px, #000000ff 75px);
        mask-repeat: no-repeat;
    }

    .boost-meter {
        mask-image: conic-gradient(#000000ff 0deg, #000000ff var(--bar), #00000000 var(--bar), #00000000 270deg), radial-gradient(#00000000 74px, #000000ff 75px);
        mask-repeat: no-repeat;
        mask-composite: intersect;

        transition: --bar 0.3s;
    }

    .boost-team-0 {
        background: radial-gradient(#027dd1, #0f1f3b);
        .boost-meter {
            background: conic-gradient(#1956f1 0deg, #027dd1 270deg, #00000000 270deg, #00000000 0deg);
        }
    }

    .boost-team-1 {
        background: radial-gradient(#913f14, #3b2702);
        .boost-meter {
            background: conic-gradient(#fc6b21 0deg, #ffa500 270deg, #00000000 270deg, #00000000 0deg);
        }
    }

    .boost-meter-inner {
        position: absolute;

        top: 30px;
        left: 30px;

        background: #00000040;
        border-radius: 50%;

        width: 140px;
        height: 140px;

        span {
            font-size: 72px;
            font-weight: 550;
            line-height: 72px;
            height: 80px;
        }
    }
</style>
