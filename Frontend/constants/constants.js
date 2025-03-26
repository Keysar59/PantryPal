export const url = 'https://pantry-pal-git-keysar59-dev.apps.rm2.thpm.p1.openshiftapps.com/api/v1';

export const GetRequest = async (path) => {
    try {
        const response = await axios.get(url + path, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log("Response to request at path (" + path + "):", response.data.message);
        setGroups(response.data.groups);
    } catch (error) {
        return error;
    }
};

export const PostRequest = async (path, params) => {
    try {
        const response = await axios.get(url + path, params, {
            headers: {
            'Content-Type': 'application/json',
            },
        });
        console.log("Response to request at path (" + path + "):", response.data.message);
        setGroups(response.data.groups);
    } catch (error) {
        return error;
    }
};
