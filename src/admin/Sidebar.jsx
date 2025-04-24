import React from "react";
import { Drawer, List, ListItem, ListItemText, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const Sidebar = ({ open }) =>{
    const navigate =useNavigate();

    const menuItems =[
        {text:'Product List',path: '/Adminproduct-list'},
        {text:'Add Product',path: '/add-product'},
        {text:'User orders',path:'/admin/orders'}
    ];

    return (
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {menuItems.map((item) => (
                <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      );
    };
    
    export default Sidebar;
