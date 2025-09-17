export const getKeyBindId = (e: KeyboardEvent) => {
    let id = "";
    const separator = "_";

    const addSeparator = () => {
        if (id && id[-1] !== separator) {
            id += separator;
        }
    };

    const addKeyModifier = () => {
        if (e.ctrlKey) id += "ctrl";
        addSeparator();
        if (e.altKey) id += "alt";
        addSeparator();
        if (e.shiftKey) id += "shift";
        addSeparator();
        if (e.metaKey) id += "cmd";
    };

    addKeyModifier();
    addSeparator();
    // before adding in which group it belons 
    id += e.key;

    // todo
    // how these keys are represented in event object
    // space, tab, backspace, delete, arrow keys, enter
    // ctrl, shift, alt, meta keys individually
};

// "Backspace", "Enter", "Shift", "Control", "Alt", "Delete"
// "ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp"

const keyBindings = {
    ctrl_k: "search",
    cmd_k: "search",
    ctrl_m: "menu toggle",
    ctrl_t: "theme if not in editor",
    ctrl_l: "lang if not in editor",
    esc: "close any window/drawer with page back if needed"
};

// ANOTHER APPROACH
// put key presses events (only required objects) in an array/queue
// them process it from start
