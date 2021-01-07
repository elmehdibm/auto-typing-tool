let statetxt = {};

let indexesTxt = {};

let stateBlink = {};

let indexesBlink = {};

const idsToClear = new Set();

const idsBlinkToClear = new Set();

export const initializeVariables = (
    stateText,
    stateBlinked
) => {
    // Manage errors when I'll extract it into a Lib
    statetxt = stateText;
    Object.keys(stateText).forEach(e => {
        indexesTxt[e] = 0;
    });
    stateBlink = stateBlinked;
    Object.keys(stateBlinked).forEach(e => {
        indexesBlink[e] = false;
    });
};

// Must Contruct map that get the idBlinks of setTimeout 
// export const clearMemoryBlink = (idBlink, delay) => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             idsBlinkToClear.forEach(id => {
//                 clearInterval(id);
//             });
//             resolve(true);
//         }, delay);
//     });
// };

export const clearMemoryAllBlinks = (delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            idsBlinkToClear.forEach(id => {
                clearInterval(id);
            });
            resolve(true);
        }, delay);
    });
};

export const clearMemoryText = () => {
    idsToClear.forEach(id => {
        clearInterval(id);
    })
};

export const typeWriter = (idText, delay = 80) => {
    return (
        new Promise((resolve) => {
            if (indexesTxt[idText] < statetxt[idText].length) {
                const element = document.getElementById(idText);
                if (element) {
                    document.getElementById(idText).innerHTML += (statetxt[idText]).charAt(indexesTxt[idText]);
                    indexesTxt[idText]++;
                    idsToClear.add(setTimeout(() => {
                        typeWriter(idText, delay).then(_ => {
                            resolve(true);
                            clearMemoryText();
                        });
                    }, delay));
                }
            } else {
                resolve(true);
            }
        })
    );
};

export const write = (idText) => {
    return (
        new Promise((resolve) => {
            const element = document.getElementById(idText);
            if (element) {
                document.getElementById(idText).innerHTML = statetxt[idText];
            }
            resolve(true);
        })
    );
};

export const pause = (time) => (
    new Promise(
        resolve => {
            setTimeout(() => {
                resolve(true);
            }, time);
        }
    )
);

export const blinkWriter = (idBlinked, delay = 800) => {
    return (
        new Promise(
            (resolve) => {
                if (document.getElementById(idBlinked)) {
                    document.getElementById(idBlinked).innerHTML = (
                        (indexesBlink[idBlinked]) ? stateBlink[idBlinked] : ""
                    );
                    indexesBlink[idBlinked] = !indexesBlink[idBlinked];
                    idsBlinkToClear.add(setTimeout(() => {
                        blinkWriter(idBlinked, delay);
                    }, delay));
                }
                resolve(true);
            }
        )
    );
};
