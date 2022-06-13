import { Box, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectLastSeen } from '../../redux/slices/lastSeenSlice'
import Card from './Card'

export default function LastSeen() {
  const lastSeen = useSelector(selectLastSeen)

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      <Typography
        sx={{
          p: '15px',
          borderBottom: '1px solid #e5e7ea',
        }}
      >
        {`Dilihat Hari Ini (${lastSeen?.value.length ?? 0})`}
      </Typography>
      {lastSeen?.value.length ? (
        lastSeen.value.map((value) => <Card product={value} key={value.id} />)
      ) : (
        <Typography p="15px">Tidak Ada</Typography>
      )}
    </Box>
  )
}
