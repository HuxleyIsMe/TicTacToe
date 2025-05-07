import { UIHandler } from "../../sharedUtils/UIHelper";
import type { UIHandlerReturnType } from "../../sharedUtils/UIHelper";

export class Opponent {
    isPlaying: boolean;
    root: string;
    UIHandler: UIHandlerReturnType;

    constructor(root: string) {
        this.isPlaying = false;
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
          (e) => this.isPlaying = !this.isPlaying,
        );
    }
}