import { mount } from "svelte";

import App from './App.svelte';

const app = mount(App, {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    target: document.querySelector(`#app`)!
});

export default app;
