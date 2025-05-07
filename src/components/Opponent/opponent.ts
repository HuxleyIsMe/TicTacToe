import { UIHandler } from "../../sharedUtils/UIHelper";
import type { UIHandlerReturnType } from "../../sharedUtils/UIHelper";
import type {Player} from "../../types"

export class Opponent {
    isPlaying: boolean;
    playsAs: Player;
    root: string;
    UIHandler: UIHandlerReturnType;

    constructor(root: string) {
        this.isPlaying = false;
        this.playsAs = 'O';
        this.root = root;
        this.UIHandler = UIHandler();
        
    }

    onStart() {
        if(document.getElementById(this.root) == null || !this.root){
            console.error('No root provided to attach opponent to!');
            return
        }
        document.getElementById(this.root)!.innerHTML = `<div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label mt-1" for="flexSwitchCheckDefault">Play computer?</label>
        </div>`

        document
        .querySelector(`#flexSwitchCheckDefault`)!
        .addEventListener(
          "change",
          () => this.isPlaying = !this.isPlaying,
        );
    }

    onNextTurn({gameState, cellIDs, turn}) {
        if(turn === this.playsAs) {
            let nextAvailableCells = gameState.indexOf("")
            let buttonToClick = cellIDs[nextAvailableCells];
            setTimeout(()=>document.getElementById(buttonToClick)?.click(), 1000); // wrap in timeout to make it a lil more human
            return buttonToClick
        }
    }
    
}