<script lang="ts">
    import goalIcon from "../img/icons/goal.svg?dataurl";
    import shotIcon from "../img/icons/shot.svg?dataurl";
    import assistIcon from "../img/icons/assist.svg?dataurl";

    import { core } from "../core.svelte";

    const goalData = $derived(core.game.goalData);
</script>

<div class={`replay-wrapper team-${core.game.goalData.scorer.teamnum}`} style={`opacity: ${core.game.watchingReplay ? 1 : 0}`}>
    <div class="score-card">
        <span>
            <!-- <FontAwesomeIcon icon={faStopwatch} /> -->
            <img src={goalIcon} alt="Goal icon" />
            <spna></spna>{goalData.scorer.name}
        </span>
        <span>
            <img src={shotIcon} alt="Goal icon" />
            <span>{Math.floor(goalData.speed)}</span>
            <span class="replay-small">kph</span>
        </span>
        {#if goalData.assister.id}
            <span class="assist">
                <img src={assistIcon} alt="Assist icon" />
                <span>{goalData.assister.name}</span>
            </span>
        {/if}
    </div>
</div>

<style lang="scss">
    .replay-wrapper {
        display: flex;
        align-items: flex-end;
        justify-content: center;

        width: 100%;
        height: 100%;

        clip-path: polygon(0% 87%, 0% 100%, 100% 100%, 100% 87%, 84% 89%, 83% 93%, 17% 93%, 16% 89%);
        transition: 0.3s;

        .score-card {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 1250px;
            height: 60px;

            > span {
                display: flex;
                align-items: center;

                margin-left: 4rem;
                margin-right: 4rem;

                text-transform: uppercase;
                font-weight: 550;
                font-size: 40px;
                line-height: 40px;

                img {
                    margin-right: 1rem;
                }

                span {
                    vertical-align: middle;
                }
            }

            span.replay-small {
                font-size: 24px;
                align-self: flex-end;
            }
        }
    }


    .team-0 {
        background: linear-gradient(to right, #de1616aa -10%, #027dd1aa 25%, #1e90ffaa 50%, #027dd1aa 75%, #de1616aa 115%);
    }

    .team-1 {
        background: linear-gradient(to right, #de1616aa -10%, #fc6b21aa 25%, #ffa321aa 50%, #fc6b21aa 75%, #de1616aa 115%);
    }

    img {
        height: 50px;
        filter: invert(99%) sepia(2%) saturate(0%) hue-rotate(143deg) brightness(115%) contrast(100%);
    }

    span:nth-child(2) img {
        transform: scaleX(-1);
    }
</style>
