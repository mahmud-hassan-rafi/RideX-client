import { errorNotify } from "../toast-notify/toastify.js";
import { api } from "./../../services/api.js";
import { setUser, clearUser } from "./authSlice.js";

export const AuthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setUser(data.user || data));
          }
        } catch (error) {
          errorNotify(error?.data?.message || error);
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            dispatch(setUser(data.user || data));
          }
        } catch (error) {
          errorNotify(error?.data?.message || error);
        }
      },
    }),
    loadUser: builder.query({
      query: () => "/auth/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data.user || data));
        } catch {
          dispatch(clearUser());
        }
      },
      providesTags: ["userAuth"],
    }),
    logout: builder.query({
      query: () => "/auth/logout",
      async onQueryStarted(_, { dispatch }) {
        dispatch(clearUser());
      },
      invalidatesTags: ["userAuth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLoadUserQuery,
  useLogoutQuery,
} = AuthApi;
