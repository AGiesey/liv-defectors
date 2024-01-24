import huntersRidge from './dummy-data/hunters-ridge-search.json';

export async function  findCourses(search: string): Promise<any> {
    const apiKey = process.env.RAPID_API_KEY;
    const apiHost = process.env.RAPID_API_HOST;
    const useDummyData = process.env.USE_DUMMY_DATA === 'true';

    if (useDummyData) {
        console.log('Fetching courses using dummy data, use search value "hunters ridge"');
        return Promise.resolve(huntersRidge);
    }

    if (!apiKey || !apiHost) {
        return Promise.reject('Missing API Key or API Host');
    }
    
    const url = `https://${apiHost}/search`;
    const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': apiHost
    }
    const query = new URLSearchParams({
        name: search
    })
    const urlWithParams = `${url}?${query.toString()}`;

    return await fetch(urlWithParams, {
        method: 'GET',
        headers
    })
    .then(response => {
        if (!response.ok) {
            //TODO: error handling, return something meaningful
            throw new Error("unable to find courses")
        }
        return response.json();
    })
}