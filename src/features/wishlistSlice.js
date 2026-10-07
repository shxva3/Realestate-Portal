import {
  createSlice
} from "@reduxjs/toolkit";

const wishlistSlice =
  createSlice({

    name: "wishlist",

    initialState: [],

    reducers: {

      addWishlist: (
        state,
        action
      ) => {

        const exists =
          state.find(
            property =>
              property.id ===
              action.payload.id
          );

        if (!exists) {

          state.push(
            action.payload
          );

        }

      },

      removeWishlist: (
        state,
        action
      ) => {

        return state.filter(
          property =>
            property.id !==
            action.payload
        );

      }

    }

  });

export const {
  addWishlist,
  removeWishlist
} =
  wishlistSlice.actions;

export default
  wishlistSlice.reducer;