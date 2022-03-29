import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiHeadersCrypto = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "c4687e272cmshe6a045041c2d7c2p1c3803jsn66e54a7e4f5e",
};

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({ url: url, headers: apiHeadersCrypto });

export const cryptoAPI = createApi({
  reducerPath: "apiCrypto",
  baseQuery: fetchBaseQuery({ baseUrl: baseURL }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query({
      query: (coinID) => createRequest(`/coin/${coinID}`),
    }),
    getCryptoHistory: builder.query({
      query: ({ coinID, period }) =>
        createRequest(`/coin/${coinID}/history?timePeriod=${period}`),
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoAPI;
