import { Avatar } from "@mui/material";
import ApprovedIcon from "./ApprovedIcon";
import BlockStatusIcon from "./BlockIcon";
import CanceledIcon from "./CancelIcon";
import CheckStatusIcon from "./CheckIcon";
import UnverifiedIcon from "./NewReleaseIcon";
import VerifiedIcon from "./VerifiedIcon";
import ProfilePicIcon from "./ProfilePicIcon";

const GetBlockStatusIcon = (isBlocked: boolean) => {
  return isBlocked ? <BlockStatusIcon /> : <CheckStatusIcon />;
};

const GetVerificationStatusIcon = (isVerified: boolean) => {
  return isVerified ? <VerifiedIcon /> : <UnverifiedIcon />;
};

const GetApprovalStatusIcon = (isApproved: boolean) => {
  return isApproved ? <ApprovedIcon /> : <CanceledIcon />;
};

const GetProfilePic = (profilePic: string | null) => {
  return profilePic ? (
    <Avatar
      src={profilePic}
      sx={{ height: "30px", width: "30px" }}
      alt="Profile"
    />
  ) : (
    <ProfilePicIcon />
  );
};

export {
  GetBlockStatusIcon,
  GetVerificationStatusIcon,
  GetApprovalStatusIcon,
  GetProfilePic,
};
