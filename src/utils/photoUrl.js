const gDriveUrlToSrc = url => {
    const [ id ] = url.split('=').slice(-1);
    return `https://drive.google.com/uc?export=view&id=${id}`
}

module.exports = gDriveUrlToSrc;