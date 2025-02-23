import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const UserApi = createApi({
  reducerPath: "UserApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://client-vazhivilakk-backend.onrender.com/api",
    credentials: "include", // Ensures cookies are sent with the request
    prepareHeaders: (headers, { getState }) => {
      // Retrieve token from localStorage
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Categories", "User",],

  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (user) => ({
        url: "/signup",
        method: "POST",
        body: user,
      }),
    }),

    signin: builder.mutation({
      query: (user) => ({
        url: "/signin",
        method: "POST",
        body: user,
      }),
    }),

    signout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),

    getUserProfile: builder.query({
      query: () => "/profile",
      providesTags: ["User"],
    }),


    getCategories: builder.query({
      query: () => "/all-categories",
      providesTags: ["Categories"],
    }),

    getVoiceByCat: builder.query({
      query: (categoryId) => categoryId ? `/voices?categoryId=${categoryId}` : "/voices",
    }),



  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useSignoutMutation,
  useGetCategoriesQuery,
  useGetUserProfileQuery,
  useGetVoiceByCatQuery
} = UserApi;
