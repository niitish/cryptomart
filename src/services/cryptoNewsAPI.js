import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeadersNews = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
  "x-rapidapi-key": "c4687e272cmshe6a045041c2d7c2p1c3803jsn66e54a7e4f5e",
};

const reqParams = {
  q: "",
  safeSearch: "Off",
  textFormat: "Raw",
  freshness: "Day",
  count: 0,
};

const baseURL = "https://bing-news-search1.p.rapidapi.com/news/search/";

const createRequest = (newsCategory, count) => {
  reqParams.q = newsCategory;
  reqParams.count = count;
  return { url: baseURL, headers: apiHeadersNews, params: reqParams };
};

export const cryptoNewsAPI = createApi({
  reducerPath: "apiCryptoNews",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (newsCategory, count) => createRequest(newsCategory, count),
    }),
  }),
});

export const { useGetNewsQuery } = cryptoNewsAPI;
