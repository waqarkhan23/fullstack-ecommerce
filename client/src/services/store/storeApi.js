/**
 * Title: Write a program using JavaScript on StoreApi
 * Author: Hasibul Islam
 * Portfolio: https://devhasibulislam.vercel.app
 * Linkedin: https://linkedin.com/in/devhasibulislam
 * GitHub: https://github.com/devhasibulislam
 * Facebook: https://facebook.com/devhasibulislam
 * Instagram: https://instagram.com/devhasibulislam
 * Twitter: https://twitter.com/devhasibulislam
 * Pinterest: https://pinterest.com/devhasibulislam
 * WhatsApp: https://wa.me/8801906315901
 * Telegram: devhasibulislam
 * Date: 11, November 2023
 */

const { canimApi } = require("../canim");

const storeApi = canimApi.injectEndpoints({
  endpoints: (builder) => ({
    // add new store
    addStore: builder.mutation({
      query: (store) => ({
        url: "/store/add-store",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: store,
      }),

      invalidatesTags: ["Store", "User"],
    }),

    // get all stores
    getStores: builder.query({
      query: () => ({
        url: "/store/get-stores",
        method: "GET",
      }),

      providesTags: ["Store"],
    }),

    // update store
    updateStore: builder.mutation({
      query: ({ id, body }) => ({
        url: `/store/update-store/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["Store", "User"],
    }),

    // get a store
    getStore: builder.query({
      query: (id) => ({
        url: `/store/get-store/${id}`,
        method: "GET",
      }),

      providesTags: ["Store"],
    }),

    // delete store
    deleteStore: builder.mutation({
      query: (id) => ({
        url: `/store/delete-store/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: ["Store", "User"],
    }),
  }),
});

export const {
  useAddStoreMutation,
  useGetStoresQuery,
  useUpdateStoreMutation,
  useGetStoreQuery,
  useDeleteStoreMutation,
} = storeApi;
