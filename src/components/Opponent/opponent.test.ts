import {Opponent} from "./opponent";

describe('Opponent', () => {
    let GeffTheOpponent: Opponent;

    beforeEach(() => {
        document.body.innerHTML = `<div id="opponent"></div>`;
        GeffTheOpponent= new Opponent("opponent");

    });
    
    it.only('toggling the control set the opponent to be on', () => {
        const root = document.querySelector("#opponent");
        GeffTheOpponent.onStart();
        root?.querySelector("#flexSwitchCheckDefault").click();
        expect(GeffTheOpponent.isPlaying).toBe(true);

    });

    it.todo('toggling the control set the opponent to be on');
})