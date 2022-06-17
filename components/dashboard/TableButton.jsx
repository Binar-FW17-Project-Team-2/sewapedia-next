import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditSharpIcon from '@mui/icons-material/EditSharp'
import { Tooltip } from '@mui/material'

export function TableEditUser({ id, handleEdit }) {
  return (
    <div>
      <Tooltip placement="top" title="Edit">
        <IconButton
          onClick={() => handleEdit(id)}
          color="primary"
          aria-label="delete"
          component="span"
        >
          <EditSharpIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}

export function TableDeleteUser({ id, handleDelete }) {
  return (
    <div>
      <Tooltip placement="top" title="Delete">
        <IconButton
          onClick={() => handleDelete(id)}
          color="primary"
          aria-label="delete"
          component="span"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
