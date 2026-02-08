import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { getDetailsAPI } from "../Services/ApiServices"; // API call
import { toast } from "react-toastify";

// Add Google Fonts dynamically
const addGoogleFont = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&family=Playfair+Display:wght@700&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return React.cloneElement(children, {
    elevation: trigger ? 6 : 0,
    style: {
      background: "linear-gradient(135deg, #1a0033 10%, #bb34a3 100%)",
      transition: "background-color 0.3s, box-shadow 0.3s",
      boxShadow: trigger ? "0 4px 20px rgba(0, 0, 0, 0.4)" : "none",
    },
  });
}

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const currentPath = window.location.pathname;

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  useEffect(() => {
    addGoogleFont();
    const fetchMenuItems = async () => {
      try {
        const response = await getDetailsAPI("menuitems");
        if (response.statusCode === 200) {
          setMenuItems(response.menus || []);
        } else {
          toast.error("Server returned an error from API!");
          console.error("API returned error:", response);
        }
      } catch (error) {
        toast.error("Server error from frontend!");
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="transparent">
          <Toolbar
            sx={{
              fontFamily: "'Poppins', sans-serif",
              color: "white",
            }}
          >
            {/* Logo Section */}
            <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
              <Box
                component="a"
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Box
                  component="img"
                  src="/akkaya_studio.png"
                  alt="Akaay Studio"
                  sx={{
                    height: 50,
                    width: "auto",
                    marginRight: 1,
                  }}
                />
                <Box
                  component="span"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: "#ffeb3b",
                    textShadow: "0px 1px 6px rgba(255, 255, 255, 0.3)",
                  }}
                ></Box>
              </Box>
            </Box>

            {/* Responsive Menu */}
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={toggleDrawer(true)}
                >
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={toggleDrawer(false)}
                >
                  <Box
                    sx={{
                      width: 250,
                      background: "linear-gradient(135deg, #1a0033, #bb34a3)",
                      height: "100%",
                      color: "white",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                  >
                    <List>
                      {menuItems.map((item) => {
                        const isActive = currentPath === item.menuUrl;
                        return (
                          <ListItem
                            button
                            component="a"
                            href={item.menuUrl}
                            key={item.menuName}
                            sx={{
                              color: isActive ? "#f8cd00" : "white",
                              "&:hover": { color: "#f8cd00" },
                            }}
                          >
                            <ListItemText primary={item.menuName} />
                          </ListItem>
                        );
                      })}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <>
                {menuItems.map((item) => {
                  const isActive = currentPath === item.menuUrl;
                  return (
                    <Button
                      key={item.menuName}
                      component="a"
                      href={item.menuUrl}
                      disableRipple
                      sx={{
                        ml: 2,
                        textTransform: "none",
                        fontFamily: "'Poppins', sans-serif",
                        color: isActive ? "#f8cd00" : "white",
                        "&:hover": {
                          color: "#f8cd00",
                          backgroundColor: "transparent",
                        },
                        "&:active": {
                          color: "#ffdb4d",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      {item.menuName}
                    </Button>
                  );
                })}

                {/* Gold Button */}
                <Button
                  variant="contained"
                  component="a"
                  href="/home"
                  startIcon={<CalendarTodayIcon />}
                  sx={{
                    ml: 4,
                    borderRadius: "50px",
                    backgroundColor: "#f8cd00",
                    color: "#1a0033",
                    fontWeight: 600,
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    boxShadow: "0 3px 10px rgba(248, 205, 0, 0.4)",
                    "&:hover": {
                      backgroundColor: "#ffdb4d",
                      transform: "scale(1.05)",
                      boxShadow: "0 6px 16px rgba(248, 205, 0, 0.6)",
                    },
                  }}
                >
                  Book Now
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </>
  );
};

export default NavBar;
