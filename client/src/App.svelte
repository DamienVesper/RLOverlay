<script lang="ts">
    const config = $state({
        titleText: ``,
        seriesText: ``,
        seriesLimit: 0,
        series: [0, 0]
    });

    const teams = $state([
        {
            name: ``,
            score: 0
        },
        {
            name: ``,
            score: 0
        }
    ]);
</script>

<div class="ui-top-center">
    <div class="title-wrapper">{config.titleText}</div>
    <div class="main-wrapper">
        <div class="team-name-wrapper">{teams[1].name}</div>
        <div class="team-score-wrapper">{teams[0].score}</div>
        <div class="time-wrapper"></div>
        <div class="team-score-wrapper">{teams[1].score}</div>
        <div class="team-name-wrapper">{teams[1].name}</div>
    </div>
</div>
