import Key from "../game/Key";

class KeyCodeParser {

    static parseKeyboardKey(a: KeyboardEvent): Key {
        return KeyCodeParser.parseCode(a.key || a.code || a.keyCode);
    }

    static parseCode(code: string|number): Key {
        if (code === 'ArrowUp' || code === 38) return Key.Up;
        if (code === 'ArrowLeft' || code === 37) return Key.Left;
        if (code === 'ArrowRight' || code === 39) return Key.Right;
        if (code === 'ArrowDown' || code === 40) return Key.Down;
        return null;
    }

}

export default KeyCodeParser;