const KeyCodeMixin = {
    _key: {
        ENTER: 13,
        SPACE: 32,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        BACKSPACE: 8,
        TAB: 9,
    },
    isSpace(code){
        return code === this._key.SPACE;
    },
    isBackSpace(code){
        return code === this._key.BACKSPACE;
    }
}

export default KeyCodeMixin;