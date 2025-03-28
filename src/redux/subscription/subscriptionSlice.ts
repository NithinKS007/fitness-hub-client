import { createSlice } from "@reduxjs/toolkit";
import { SubscriptionState } from "./subscriptionTypes";
import {
  addSubscription,
  cancelSubscriptionUser,
  deleteSubscription,
  getSubscribedDetails,
  getTrainerSubscribedUsers,
  getTrainerSubscriptionById,
  getTrainerSubscriptions,
  getUserSubscriptionsData,
  isSubscribedToTheTrainer,
  purchaseSubscription,
  updateSubscription,
  updateSubscriptionBlockStatus,
} from "./subscriptionThunk";


const initialState: SubscriptionState = {
  isLoading: false,
  error: null,
  subscriptions: [],
  userSubscribedTrainerPlans:[],
  subscribersOfTrainer:[],
  isSubscribedToTheTrainer:null,
  pagination:{ totalPages: 0, currentPage: 1}
  
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      //add subscriptions
      .addCase(addSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscriptions.push(action.payload.data);
      })
      .addCase(addSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to add subscription";
      })

      //get trainer subscriptions
      .addCase(getTrainerSubscriptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerSubscriptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscriptions = action.payload.data;
      })
      .addCase(getTrainerSubscriptions.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer subscriptions";
      })

      //update block status
      .addCase(updateSubscriptionBlockStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubscriptionBlockStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedSubscription = action.payload.data;

        console.log("subscription payload");
        state.subscriptions = state.subscriptions.map((sub) =>
          sub._id === updatedSubscription._id ? updatedSubscription : sub
        );
        state.error = null;
      })

      .addCase(updateSubscriptionBlockStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to update subscription block status";
      })

      // delete subscriptions
      .addCase(deleteSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedSubscription = action.payload.data;
        state.subscriptions = state.subscriptions.filter(
          (sub) => sub._id !== updatedSubscription._id
        );
        state.error = null;
      })

      .addCase(deleteSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to delete subscription";
      })
      .addCase(updateSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSubscription.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedSubscription = action.payload.data;
        state.subscriptions = state.subscriptions.map((sub) =>
          sub._id === updatedSubscription._id ? updatedSubscription : sub
        );
        state.error = null;
      })

      .addCase(updateSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to edit subscription";
      })

      .addCase(getTrainerSubscriptionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerSubscriptionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscriptions = action.payload.data;
      })
      .addCase(getTrainerSubscriptionById.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get trainer subscription by id";
      })

      //redirect to subscription checkout
      .addCase(purchaseSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(purchaseSubscription.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(purchaseSubscription.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to redirect to subscription checkout";
      })
      
      .addCase(getSubscribedDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscribedDetails.fulfilled, (state,action) => {

        console.log("paylooad data coming",action.payload)
        state.isLoading = false;
        state.error = null;
        state.userSubscribedTrainerPlans = [
          ...state.userSubscribedTrainerPlans,
          action.payload.data.subscriptionData,
        ];
        state.isSubscribedToTheTrainer = {
          ...state.isSubscribedToTheTrainer,
          [action.payload.data.subscriptionData.trainerId]: {
            isSubscribed: action.payload.data.isSubscribed,
          },
        }

      })
      .addCase(getSubscribedDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get subscription data for state update";
      })

      //get list of user subscribed plans
      .addCase(getUserSubscriptionsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSubscriptionsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.userSubscribedTrainerPlans = action.payload.data.userSubscriptionsList
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages

      })
      .addCase(getUserSubscriptionsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get user subscribed trainers data";
      })
      //get list of subscribers of trainer
      .addCase(getTrainerSubscribedUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTrainerSubscribedUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.subscribersOfTrainer = action.payload.data.trainerSubscribers,
        state.pagination.currentPage = action.payload.data.paginationData.currentPage
        state.pagination.totalPages = action.payload.data.paginationData.totalPages
      })
      .addCase(getTrainerSubscribedUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to get subscribers of trainer";
      })

      .addCase(cancelSubscriptionUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelSubscriptionUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const {stripeSubscriptionId ,isActive,cancelAction} = action.payload.data.subscriptionCancelledData

        if(cancelAction==="cancelImmediately") {
          state.userSubscribedTrainerPlans = state.userSubscribedTrainerPlans.map((sub) => {
            if (stripeSubscriptionId === sub.stripeSubscriptionId) {
              return { ...sub, isActive }; 
            }
            return sub;
        })
        }
      
      })
      .addCase(cancelSubscriptionUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Failed to cancel user subscriptions";
      })

      //to check is he subscribed to the trainer true or false
      .addCase(isSubscribedToTheTrainer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(isSubscribedToTheTrainer.fulfilled, (state, action) => {
        const subscribedData = action.payload.data.isUserSubscribedToTheTrainer
        state.isLoading = false;
        state.error = null;
        state.isSubscribedToTheTrainer = {
          ...state.isSubscribedToTheTrainer,
          [subscribedData.trainerId]: {
            isSubscribed: subscribedData.isSubscribed,
          },
        };
      })
      .addCase(isSubscribedToTheTrainer.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Error in checking user subscription status";
      })
    
  },
});


export default subscriptionSlice.reducer;
