import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axios";
import { RequestDeleteSubscription, RequestSessionIdForSubscription, SubscribersListQueryParams, Subscription, UserSubscriptionsListQueryParams } from "./subscriptionTypes";
import { updateBlockStatus } from "../admin/adminTypes";
import { Stripe } from "@stripe/stripe-js";

export const addSubscription = createAsyncThunk(
  "subscription/addSubscription",
  async (subscription: Subscription, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "trainer/add-subscription",
        subscription
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add subscription");
      }
    }
  }
);

export const getTrainerSubscriptions = createAsyncThunk(
  "subscription/getTrainerSubscriptions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("trainer/subscriptions/");
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get trainer subscriptions");
      }
    }
  }
);

export const updateSubscriptionBlockStatus = createAsyncThunk(
  "subscription/updateSubscriptionBlockStatus",
  async ({ _id, isBlocked }: updateBlockStatus, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(
        `trainer/subscriptions/${_id}`,
        { isBlocked }
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to add subscription");
      }
    }
  }
);

export const deleteSubscription = createAsyncThunk(
  "subscription/deleteSubscription",
  async ({_id}: RequestDeleteSubscription, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `trainer/subscriptions/${_id}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to delete subscription");
      }
    }
  }
);

export const updateSubscription = createAsyncThunk(
  "subscription/updateSubscription",
  async (
    { subscriptionData }: { subscriptionData: Subscription },
    { rejectWithValue }
  ) => {
    const { _id } = subscriptionData;

    console.log("id to be updated", _id);
    try {
      const response = await axiosInstance.put(
        `trainer/subscriptions/${_id}`,
        subscriptionData
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update subscription data");
      }
    }
  }
);

export const getTrainerSubscriptionById = createAsyncThunk(
  "subscription/getTrainerSubscriptionById",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `admin/trainer/subscriptions/${_id}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to update subscription data");
      }
    }
  }
);

export const purchaseSubscription = createAsyncThunk(
  "subscription/purchaseSubscription",
  async (
    { subscriptionId, stripe }: { subscriptionId: string ,stripe: Stripe },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.post(
        `user/checkout-subscription-session/`,
        { subscriptionId }
      );
      const { sessionId } = response.data.data;

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        return rejectWithValue(error.message);
      }
      return sessionId;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to purchase subscription");
      }
    }
  }
);

export const getSubscribedDetails = createAsyncThunk(
  "subscription/getSubscribedDetails",
  async (sessionId: RequestSessionIdForSubscription, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `user/verify-subscriptions/${sessionId}`
      );
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(
          "Failed to fetch subscription details with sessionId"
        );
      }
    }
  }
);

export const getUserSubscriptionsData = createAsyncThunk(
  "subscription/getUserSubscriptionsData",
  async (params:UserSubscriptionsListQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/subscriptions/`,{ params });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get user subscriptions");
      }
    }
  }
);

export const isSubscribedToTheTrainer = createAsyncThunk(
  "user/isSubscribedToTheTrainer",
  async (_id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`user/trainer-subscription-status/${_id}`);
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get is he subscribed to the trainer status");
      }
    }
  }
);

export const cancelSubscriptionUser = createAsyncThunk(
  "subscription/cancelSubscriptionUser",
  async (
    {
      stripeSubscriptionId,
      action,
      subId,
    }: {
      stripeSubscriptionId: string;
      action: string;
      subId: string;
    },
    { rejectWithValue }
  ) => {
    try {
      console.log(
        "data for submitting",
        stripeSubscriptionId,
        action,
        subId
      );
      const response = await axiosInstance.patch(`user/cancel-subscriptions`, {
        stripeSubscriptionId,
        action,
        subId,
      });
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to cancel user subscriptions");
      }
    }
  }
);

export const getTrainerSubscribedUsers = createAsyncThunk(
  "subscription/getTrainerSubscribedUsers",
  async (params:SubscribersListQueryParams, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`trainer/subscribers/`,{params});
      return response.data;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Failed to get subscribers of trainer");
      }
    }
  }
);

