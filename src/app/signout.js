'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import Image from "next/image";

import {
  Box,
  Menu,
  Typography,
  Link,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

export default function Signout() {
  const router = useRouter();
  //const { data, status } = useSession();
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const handleSignOut = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/" });
    router.push(data.url);
  };

  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            //src={userimg}
            //alt={userimg}
            alt="user-img"
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {/* {data?.user?.username} */}
            </Typography>
            {/* <FeatherIcon icon="chevron-down" width="20" height="20" /> */}
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "385px",
          },
        }}
      >
        <Box>
          <Box p={2} pt={0}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton>
            </List>
          </Box>
          <Divider />
          <Box p={2}>
            <Link to="/">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSignOut()}
              >
                Logout
              </Button>
            </Link>
          </Box>
        </Box>
      </Menu>
    </>
  );
}
