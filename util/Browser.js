const Browser = {
    userAgent(){
        return navigator.userAgent || window.navigator.userAgent;
    },

    isiPhone(){
        return !!this.userAgent().match('iPhone');
    },

    isiPad(){
        return !!this.userAgent().match('iPad');
    },

    isAndroid(){
        return !!this.userAgent().match('Android');
    },

    isWechat(){
        return !!this.userAgent().match('MicroMessenger');
    },

    isQQ(){
        return !!this.userAgent().match('QQ') && !this.isWechat();
    },

}

export default Browser;