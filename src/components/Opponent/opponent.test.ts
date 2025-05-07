import {Opponent} from "./opponent";

const CELL_IDS = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];

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
        const mockGameState = new Array(8).fill("X");
        GeffTheOpponent.onStart();
        document.getElementById("flexSwitchCheckDefault")!.click();
        expect(GeffTheOpponent.isPlaying).toBe(true);
        let res = GeffTheOpponent.onNextTurn({gameState: [...mockGameState, ""], cellIDs: CELL_IDS, turn: 'O'});
        expect(res).toBe('i')
    })

    it('Only plays on its turn', () => {
        const mockGameState = new Array(7).fill("X");
        GeffTheOpponent.onStart();
        document.getElementById("flexSwitchCheckDefault")!.click();
        expect(GeffTheOpponent.isPlaying).toBe(true);
        let res = GeffTheOpponent.onNextTurn({gameState: [...mockGameState, "", ""], cellIDs: CELL_IDS, turn: 'X'});
        expect(res).toBe(undefined)
        let res2 = GeffTheOpponent.onNextTurn({gameState: [...mockGameState, "X", ""], cellIDs: CELL_IDS, turn: 'O'});
        expect(res2).toBe('i')
    })
})