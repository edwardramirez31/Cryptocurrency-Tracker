import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const headers = {
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
  "x-rapidapi-key": "125fdd5c24mshc1ca0f8211c4726p17b8ebjsn6db88d7bbf33",
};

const urlHandler = (url) => {
  return { url, headers };
};

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://coinranking1.p.rapidapi.com/",
  }),
  endpoints: (builder) => ({
    getCoins: builder.query({
      query: (count) => urlHandler(`coins?limit=${count}`),
    }),
  }),
});

// Exporting the hook created by the api slice
export const { useGetCoinsQuery } = cryptoApi;
