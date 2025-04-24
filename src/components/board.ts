export const generateBoardFromMatrix = (root) => {
  document.querySelector<HTMLDivElement>(root)!.innerHTML = `
        <div class='row border-bottom'>
            <div class='col'></div>
            <div class='col col-mid'></div>
            <div class='col'></div>
        </div>
        <div class='row'>
            <div class='col '></div>
            <div class='col col-mid'></div>
            <div class='col '></div>
        </div>
        <div class='row border-top'>
            <div class='col'></div>
            <div class='col col-mid'></div>
            <div class='col'></div>
        </div>
    
    `;
};
