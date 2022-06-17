import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SideDrawerData from './SideDrawerData'
import Link from 'next/link'

export const mainListItems = (
  <React.Fragment>
    {SideDrawerData.map((item, index) => (
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        href={item.path}
        key={index}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </Link>
    ))}
  </React.Fragment>
)
