import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload.id);
    },
    deleteInvoices: (state, action) => {
      return state.filter((invoice) => !action.payload.includes(invoice.id));
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoices: (state, action) => {
      action.payload.forEach((updatedInvoice) => {
        const index = state.findIndex(
            (invoice) => invoice.id === updatedInvoice.id
        );
        if (index !== -1) {
          state[index] = updatedInvoice;
        }
      });
    }
  },
});

export const { addInvoice, deleteInvoice, updateInvoice, deleteInvoices, updateInvoices } =
  invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
