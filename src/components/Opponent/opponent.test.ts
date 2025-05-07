import {Opponent} from "./opponent";

// const CELL_IDS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

describe('Opponent', () => {
    let GeffTheOpponent: Opponent;

    beforeEach(() => {
        document.body.innerHTML = `<div id="opponent"></div>`;
        GeffTheOpponent= new Opponent("opponent");

    });
    
    it('toggling the control set the opponent to be on and play as "O"', () => {
        GeffTheOpponent.onStart();
        document.getElementById("flexSwitchCheckDefault")!.click();
        expect(GeffTheOpponent.isPlaying).toBe(true);
        expect(GeffTheOpponent.playsAs).toBe('O');
    });



    it('onNextTurn it will select an empty available square', () => {
        // const mockGameState = ["", "", "", "X", "", "X", "", "", "O"];
        GeffTheOpponent.onStart();
        document.getElementById("flexSwitchCheckDefault")!.click();
        expect(GeffTheOpponent.isPlaying).toBe(true);
        GeffTheOpponent.onNextTurn();

    })
})