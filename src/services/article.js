//It imports createApi and fetchBaseQuery, which are used to create an API slice for making network requests.
import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

//Something that we keep secrects right! which we are getting from our environmental variables(env)
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;


export const articleApi = createApi ({
    //reducerPath: 'articleApi': This sets a unique name for the slice of the Redux store
    // where the data fetched by this API will be stored.
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery ({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key' , rapidApiKey);
            headers.set('X-RapidAPI-HOst' , 
            'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),

    //In Redux Toolkit Query, the endpoints section is where you define the specific API endpoints you want to work with. 
    //It's a way to encapsulate and organize the various requests your application makes to a particular API.
    endpoints: (builder) => ({
        getSummary: builder.query({
            // encodeURIComponent() function encodes special characters that may be present in the parameter values
            // If we do not properly encode these characters, they can be misinterpreted by the server and cause errors or unexpected behavior. Thus that RTK bug
            query: (params) => `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        }),
    }),
})

export const { useLazyGetSummaryQuery } = articleApi