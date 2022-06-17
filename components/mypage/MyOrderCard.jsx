import { Box, Button, Typography } from '@mui/material'
import { RESPONSE_LIMIT_DEFAULT } from 'next/dist/server/api-utils'

export function MyOrderCard({ order }) {
  function deadline(order) {
    const rentAt = new Date(order.updatedAt)
    rentAt.setDate(rentAt.getDate() + order.lamaSewa)
    return rentAt.toDateString()
  }

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        py: 1,
        borderBottom: '1px solid #f6f6f6',
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          position: 'relative',
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '100px',
            flexShrink: 0,
            paddingTop: '100px',
            background: `url(${order.productDetails.img_url[0]})`,
            backgroundSize: 'cover',
          }}
        />
        <Box
          sx={{
            flex: 1,
            pl: 2,
          }}
        >
          <Typography component="h1" fontWeight="bold" variant="body1">
            {order.productDetails.name}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              pt: 1,
            }}
          >
            <Typography
              sx={{ flex: 1 }}
              component="p"
              variant="body1"
            >{`Kuantitas: ${order.qty} buah`}</Typography>
            <Typography
              sx={{ flex: 1, textAlign: 'center' }}
              component="p"
              variant="body1"
            >{`Lama sewa: ${order.lamaSewa} hari`}</Typography>
            <Typography
              sx={{ flex: 1, textAlign: 'right' }}
              component="p"
              variant="body1"
            >{`Harga: Rp${order.productDetails.price}`}</Typography>
          </Box>
          {order.status === 'rented' ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                pt: 1,
              }}
            >
              <Typography>
                {new Date(order.createdAt).toDateString()}
              </Typography>
              <Typography textAlign="center">Sampai</Typography>
              <Typography>{deadline(order)}</Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
      <Box
        sx={{
          boxSizing: 'border-box',
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          width: '100%',
          p: '10px',
          mt: 1,
          backgroundColor: '#f5f5f5',
        }}
      >
        {order.status === 'rented' ? (
          <Typography>{`ID: ${order.id}`}</Typography>
        ) : order.status === 'returned' ? (
          <Button color="primary" variant="contained">
            Review
          </Button>
        ) : order.status === 'reviewed' ? (
          <Button color="primary" variant="contained" disabled>
            telah diriview
          </Button>
        ) : null}
        <Typography mr={2} ml="auto">
          Subtotal:
        </Typography>
        <Typography color="primary">
          Rp{order.qty * order.lamaSewa * order.productDetails.price},-
        </Typography>
      </Box>
    </Box>
  )
}

export function NoOrderYet() {
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100%',
        py: 10,
      }}
    >
      <Typography textAlign="center">Belum ada pesanan</Typography>
    </Box>
  )
}
