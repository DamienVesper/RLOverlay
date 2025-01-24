export const formatTime = (time: number) => {
    const second = (time % 60).toString().padStart(2, `0`);
    const minute = Math.floor(time / 60) % 60;
    const hour = Math.floor(time / 3600);

    const min = hour > 0 ? minute.toString().padStart(2, `0`) : `${minute}`;

    return time > 3600
        ? `${hour}:${min}:${second}`
        : `${min}:${second}`;
};
