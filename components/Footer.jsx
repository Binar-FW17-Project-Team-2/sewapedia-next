import { Box, Container, styled, Typography } from '@mui/material'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        boxSizing: 'border-box',
        backgroundColor: '#333',
        width: '100%',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: {
            xs: 'block',
            md: 'table',
          },
          height: '100%',
          py: '10px',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: {
              xs: 'inline',
              md: 'table-cell',
            },
            textAlign: 'center',
            verticalAlign: 'top',
            width: '216px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: {
                xs: 'center',
                md: 'start',
              },
              alignItems: 'end',
            }}
          >
            <SmartToyOutlinedIcon
              sx={{
                fontSize: '30px',
                color: 'white',
              }}
            />
            <Typography
              variant="body1"
              component="h1"
              fontWeight="bold"
              fontFamily={'roboto'}
              color="white"
              sx={{}}
            >
              SEWA
            </Typography>
            <Typography
              variant="body1"
              component="h1"
              fontWeight="small"
              color="white"
            >
              PEDIA
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: {
              xs: '15px',
              md: 0,
            },
            textAlign: {
              xs: 'center',
              md: 'left',
            },
          }}
        >
          <Address>Nama Perusahaan Sewapedia Co., Ltd.</Address>
          <Address>
            Alamat#404, lantai 4, Jl.S Parman Kav 62-63 Jakarta 11410 Slipi
          </Address>
          <Address>Nomor pendaftaran bisnis 744-81-01846</Address>
          <br />
          <Address>Perwakilan Team2</Address>
          <Address>Telepon 1833-9696</Address>
          <Address>Faks 070-4850-8999</Address>
          <br />
          <Address>Team2, Petugas Perlindungan Informasi Pribadi</Address>
          <br />
          <Address>
            Copyright © 2022 Sewapedia Co., Ltd. All Rights Reserved.
          </Address>
        </Box>
      </Container>
    </Box>
  )
}

const Address = styled(Typography)({
  display: 'inline-block',
  paddingRight: '10px',
  lineHeight: '18px',
  fontSize: '12px',
  fontWeight: 300,
  color: 'rgba(255,255,255,0.5)',
})
