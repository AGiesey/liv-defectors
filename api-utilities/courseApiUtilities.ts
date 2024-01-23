import huntersRidge from './dummy-data/hunters-ridge-search.json';

export function findCourses(search: string): Promise<any> {
    // env vars public until I figure out server/client better
    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    const useDummyData = process.env.NEXT_PUBLIC_USE_DUMMY_DATA;

    if (useDummyData) {
        return Promise.resolve(huntersRidge);
    }

    if (!apiKey || !apiHost) {
        return Promise.reject("Missing API Key or API Host");
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

    return fetch(urlWithParams, {
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