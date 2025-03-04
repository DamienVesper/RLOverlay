export const animateTopBar = (delay: number) => {
    const titleWrapper = document.querySelector<HTMLDivElement>(`.scorebug .title-wrapper`);
    const timerWrapper = document.querySelector<HTMLDivElement>(`.scorebug .timer-wrapper`);
    const seriesWrapper = document.querySelector<HTMLDivElement>(`.scorebug .series-wrapper`);

    const scoreWrappers = document.querySelectorAll<HTMLDivElement>(`.scorebug .score-wrapper`);
    const teamNameWrappers = document.querySelectorAll<HTMLDivElement>(`.scorebug .team-name-wrapper`);
    const seriesIndicators = document.querySelectorAll<HTMLDivElement>(`.scorebug .series-indicator`);

    const blueWins = document.querySelectorAll<HTMLDivElement>(`.scorebug .series-blue div`);
    const orangeWins = document.querySelectorAll<HTMLDivElement>(`.scorebug .series-orange div`);

    const blueBoostBars = document.querySelectorAll<HTMLDivElement>(`.player-boost-bars > .boost-team-0`);
    const orangeBoostBars = document.querySelectorAll<HTMLDivElement>(`.player-boost-bars > .boost-team-1`);

    const textElements = document.querySelectorAll<HTMLSpanElement>(`.scorebug span.text-animatable`);

    titleWrapper?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 500,
        delay: 500 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    timerWrapper?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 250,
        delay: 250 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    seriesWrapper?.animate([
        { opacity: 0, transform: `scaleY(0)` },
        { opacity: 1, transform: `scaleY(1)` }
    ], {
        duration: 250,
        delay: 1000 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    scoreWrappers[0]?.animate([
        { opacity: 1, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 250,
        delay: 500 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    teamNameWrappers[0]?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 500,
        delay: 750 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    scoreWrappers[1]?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 250,
        delay: 500 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    teamNameWrappers[1]?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 500,
        delay: 750 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    seriesIndicators[0]?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 350,
        delay: 1250 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    seriesIndicators[1]?.animate([
        { opacity: 0, transform: `scaleX(0)` },
        { opacity: 1, transform: `scaleX(1)` }
    ], {
        duration: 350,
        delay: 1250 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    const animateText: [Keyframe[], KeyframeAnimationOptions] = [[
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 800,
        delay: 1375 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    }];

    const winAnim: Keyframe[] = [
        { width: `0%` },
        { width: `100%` }
    ];

    const boostAnimOptions: KeyframeAnimationOptions = {
        duration: 150,
        delay: 0 + delay,
        easing: `ease-in-out`,
        fill: `backwards`
    };

    textElements.forEach(el => el.animate(...animateText));

    blueWins.forEach((el, i) => el.animate(winAnim, {
        duration: 250,
        delay: 1600 + i * 250 + delay,
        easing: `linear`,
        fill: `backwards`
    }));

    orangeWins.forEach((el, i) => el.animate(winAnim, {
        duration: 250,
        delay: 1600 + i * 250 + delay,
        easing: `linear`,
        fill: `backwards`
    }));

    blueBoostBars.forEach(el => el.animate([
        { opacity: 0, transform: `translateX(-100%)` },
        { opacity: 1, transform: `translateX(0)` }
    ], boostAnimOptions));

    orangeBoostBars.forEach(el => el.animate([
        { opacity: 0, transform: `translateX(100%)` },
        { opacity: 1, transform: `translateX(0)` }
    ], boostAnimOptions));
};
