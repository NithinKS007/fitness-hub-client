import React, { useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import TrainerSubscriptionForm from "../../components/modals/SubscriptionSetting";
import useSubscription from "../../hooks/useSubscription";
import ReuseTable from "../../components/table/ReuseTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useModal } from "../../hooks/useModal";
import ConfirmationModalDialog from "../../components/modals/ConfirmationModalDialog";
import { TableColumn } from "../../types/tableTypes";
import ShimmerTableLoader from "../../components/table/ShimmerTable";
import Error from "../../components/shared/Error";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NavigationTabs from "../../components/Tabs";
import { GetBlockStatusIcon } from "../../components/icons/IconIndex";

const columns: TableColumn[] = [
  { label: "Sl No", field: "slno" },
  { label: "Subscription Period", field: "subPeriod" },
  { label: "Price", field: "price" },
  { label: "Duration in Weeks", field: "durationInWeeks" },
  { label: "Sessions Per Week", field: "sessionsPerWeek" },
  { label: "Total Sessions", field: "totalSessions" },
  { label: "Status", field: "isBlocked" },
  { label: "Actions", field: "actions" },
];

const tabItems = [{ label: "My plans" }];

const SubscriptionSettingPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const {
    subPeriods,
    formik,
    subscriptions,
    UpdateSubsBlockstatus,
    editSubscription,
    deleteSubs,
    isEditMode,
    open,
    handleClose,
    handleOpen,
  } = useSubscription();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log("event", event);
    setSelectedTab(newValue);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<
    string | null
  >(null);
  const [selectedSubscriptionForDelete, setSelectedSubscriptionForDelete] =
    useState<any | null>(null);
  const [selectedSubscriptionForBlock, setSelectedSubscriptionForBlock] =
    useState<any | null>(null);

  const openMenu = Boolean(anchorEl);
  const {
    open: confirmationDeleteModalOpen,
    handleOpen: handleConfirmationDeleteModalOpen,
    handleClose: handleConfirmationDeleteModalClose,
  } = useModal();

  const {
    open: confirmationBlockblockModalOpen,
    handleOpen: handleConfirmationBlockModalOpen,
    handleClose: handleConfirmationBlockModalClose,
  } = useModal();

  const { isLoading, error } = useSelector(
    (state: RootState) => state.subscription
  );
  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    _id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubscriptionId(_id);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedSubscriptionId(null);
  };

  const handleDeleteAction = (sub: any) => {
    setSelectedSubscriptionForDelete(sub);
    handleConfirmationDeleteModalOpen();
    handleCloseMenu();
  };

  const handleBlockAction = (sub: any) => {
    setSelectedSubscriptionForBlock(sub);
    handleConfirmationBlockModalOpen();
    handleCloseMenu();
  };

  const handleConfirmDelete = () => {
    if (selectedSubscriptionForDelete) {
      deleteSubs(selectedSubscriptionForDelete._id as string);
      handleConfirmationDeleteModalClose();
      setSelectedSubscriptionForDelete(null);
    }
  };

  const handleConfirmBlock = () => {
    if (selectedSubscriptionForBlock) {
      UpdateSubsBlockstatus({
        _id: selectedSubscriptionForBlock._id as string,
        isBlocked: !selectedSubscriptionForBlock.isBlocked,
      });
      handleConfirmationBlockModalClose();
      setSelectedSubscriptionForBlock(null);
    }
  };

  const SubscriptionsData =
    subscriptions && subscriptions.length > 0
      ? subscriptions.map((sub, index) => {
          return {
            ...sub,
            isBlocked: GetBlockStatusIcon(sub?.isBlocked as boolean),
            slno: index + 1,
            subPeriod:
              sub.subPeriod.charAt(0).toUpperCase() + sub.subPeriod.slice(1),
            price: `USD : ${sub.price}`,
            actions: (
              <>
                <IconButton
                  onClick={(event) =>
                    handleMenuClick(event, sub?._id as string)
                  }
                  sx={{
                    color: "gray",
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Paper>
                  <Menu
                    anchorEl={anchorEl}
                    open={openMenu && selectedSubscriptionId === sub?._id}
                    onClose={handleCloseMenu}
                    sx={{
                      "& .MuiPaper-root": {
                        boxShadow: "none",
                        border: "1px solid",
                        width: 150,
                        borderColor: "grey.400",
                        borderRadius: 2,
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => editSubscription(sub?._id as string)}
                    >
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleDeleteAction(sub)}>
                      Delete
                    </MenuItem>
                    <MenuItem onClick={() => handleBlockAction(sub)}>
                      {sub.isBlocked ? "Unblock" : "Block"}
                    </MenuItem>
                  </Menu>
                </Paper>
              </>
            ),
          };
        })
      : [];
  console.log(SubscriptionsData);

  return (
    <>
      <NavigationTabs
        tabItems={tabItems}
        value={selectedTab}
        handleChange={handleTabChange}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: "#1f2937",
            color: "white",
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          ADD NEW PLAN
        </Button>
      </Box>
      {selectedTab === 0 && (
        <>
          <TrainerSubscriptionForm
            open={open as boolean}
            onClose={handleClose}
            subPeriods={subPeriods}
            formik={formik}
            isEditMode={isEditMode!! as boolean}
          />
          {isLoading ? (
            <ShimmerTableLoader columns={columns} />
          ) : error ? (
            <Error message={error} />
          ) : (
            <ReuseTable columns={columns} data={SubscriptionsData} />
          )}
        </>
      )}

      <ConfirmationModalDialog
        open={confirmationDeleteModalOpen as boolean}
        content={
          selectedSubscriptionForDelete
            ? `Are you sure you want to delete the ${
                selectedSubscriptionForDelete?.subPeriod
                  .charAt(0)
                  .toUpperCase() +
                selectedSubscriptionForDelete.subPeriod.slice(1)
              } subscription?`
            : ""
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleConfirmationDeleteModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="success"
        cancelColor="error"
      />
      <ConfirmationModalDialog
        open={confirmationBlockblockModalOpen as boolean}
        content={
          selectedSubscriptionForBlock
            ? `Are you sure you want to ${
                selectedSubscriptionForBlock.isBlocked ? "unblock" : "block"
              } the ${
                selectedSubscriptionForBlock?.subPeriod
                  .charAt(0)
                  .toUpperCase() +
                selectedSubscriptionForBlock.subPeriod.slice(1)
              } subscription?`
            : ""
        }
        onConfirm={handleConfirmBlock}
        onCancel={handleConfirmationBlockModalClose}
        confirmText="Yes"
        cancelText="No"
        confirmColor="success"
        cancelColor="error"
      />
    </>
  );
};

export default SubscriptionSettingPage;
