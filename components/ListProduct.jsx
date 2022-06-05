import { Box, Container, Typography } from '@mui/material'
import Card from './Card'

export default function ListProduct({ title, products }) {
  return (
    <Container
      maxWidth="xl"
      sx={{
        py: {
          xs: '15px',
          md: '50px',
        },
      }}
    >
      <Box pb={2}>
        <Typography
          component="h1"
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: '20px',
              md: '30px',
            },
            textAlign: 'center',
            color: '#333333',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        component="ul"
        mb={2}
        p={0}
        sx={{
          boxSizing: 'border-box',
          width: {
            xs: '102%',
            md: '100%',
          },
          mr: { md: '-10px' },
          height: 'auto',
          whiteSpace: {
            xs: 'nowrap',
            md: 'normal',
          },
          overflowX: {
            xs: 'auto',
            md: 'unset',
          },
        }}
      >
        {!products.length ? (
          <Typography>products tidak ada</Typography>
        ) : (
          products.map((product) => (
            <Card
              product={product}
              sx={{ width: { xs: '43.5%', md: '33.33%' } }}
              key={product.id}
            />
          ))
        )}
      </Box>
    </Container>
  )
}
