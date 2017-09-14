export default class TimeUtil {
    static formateTime(msInput) {
        let ms = 0;
        if (typeof msInput !== 'number') {
            if (msInput !== null) {
                ms = parseInt(msInput);
                if (isNaN(ms)) {
                    ms = 0;
                }
            }
        } else {
            ms = msInput;
        }
        const msCount = ms % 1000;
        const sCount = (ms - msCount) / 1000;
        const sNum = sCount % 60;
        const mNum = (sCount - sNum) / 60;
        return _digt2(mNum) + ':' + _digt2(sNum);
    }

}

function _digt2(num) {
    if (num >= 10) {
        return num;
    } else {
        return '0' + num;
    }
}
