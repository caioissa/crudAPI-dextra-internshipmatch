const client = {
    verifyIdToken: body => {
        if (!body.idToken) {
            return null;
        }
        return {
            getPayload: () => {
                if (body.idToken == 'dextra') {
                    return ({
                        email: 'caio.issa@dextra-sw.com'
                    })
                } else {
                    return ({
                        email: 'caioissa96@gmail.com'
                    })
                }
            }
        }
    }
}

module.exports = client;