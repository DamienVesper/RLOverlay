export const animateTopBar = () => {
    const titleWrapper = document.querySelector<HTMLDivElement>(`.title-wrapper`);
    const timerWrapper = document.querySelector<HTMLDivElement>(`.timer-wrapper`);
    const seriesWrapper = document.querySelector<HTMLDivElement>(`.series-wrapper`);

    const scoreWrappers = document.querySelectorAll<HTMLDivElement>(`.score-wrapper`);
    const teamNameWrappers = document.querySelectorAll<HTMLDivElement>(`.team-name-wrapper`);
    const seriesIndicators = document.querySelectorAll<HTMLDivElement>(`.series-indicator`);

    titleWrapper?.animate([
        { opacity: 0, transform: `translateY(-100%)` },
        { opacity: 1, transform: `translateY(0)` }
    ], {
        duration: 1000,
        delay: 500,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    timerWrapper?.animate([
        { opacity: 0, transform: `translateY(-100%)` },
        { opacity: 1, transform: `translateY(0)` }
    ], {
        duration: 800,
        delay: 1200,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    seriesWrapper?.animate([
        { opacity: 0, transform: `translateY(-100%)` },
        { opacity: 1, transform: `translateY(0)` }
    ], {
        duration: 563,
        delay: 1687,
        easing: `ease-in-out`,
        fill: `backwards`
    });

    const animateLeft: [Keyframe[], KeyframeAnimationOptions] = [[
        { opacity: 0, transform: `translateX(100%)` },
        { opacity: 1, transform: `translateX(0)` }
    ], {
        duration: 1125,
        delay: 1125,
        easing: `ease-in-out`,
        fill: `backwards`
    }];

    const animateRight: [Keyframe[], KeyframeAnimationOptions] = [[
        { opacity: 0, transform: `translateX(-100%)` },
        { opacity: 1, transform: `translateX(0)` }
    ], {
        duration: 1125,
        delay: 1125,
        easing: `ease-in-out`,
        fill: `backwards`
    }];

    scoreWrappers[0]?.animate(...animateLeft);
    teamNameWrappers[0]?.animate(...animateLeft);
    seriesIndicators[0]?.animate(...animateLeft);

    scoreWrappers[1]?.animate(...animateRight);
    teamNameWrappers[1]?.animate(...animateRight);
    seriesIndicators[1]?.animate(...animateRight);
};
