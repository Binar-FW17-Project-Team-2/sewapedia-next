import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import BorderedBottomBox from "../components/BorderedBottomBox";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from "@mui/material";


const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: theme.palette.common.white,
}));

const CustomAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.common.black}`,
  padding: theme.spacing(1, 3),
  "&.Mui-expanded": {
    padding: theme.spacing(0, 3),
  },
}));

function FAQ() {
  const [activeItem, setActiveItem] = useState(false);
  const router = useRouter();

  const handleChange = (panel) => (event, isExpanded) => {
    setActiveItem(isExpanded ? panel : false);
  };

  return (
    <BorderedBottomBox>
     <Button align="center" href="/">
          Back to Home
    </Button>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          component="h3"
          color="common.white"
          align="center"
          sx={{ mb: 6 }}
        >
          Frequently Asked Questions
        </Typography>
        <Stack spacing={1} mb={8}>
          <CustomAccordion
            square
            expanded={activeItem === "panel1"}
            onChange={handleChange("panel1")}
          >
            <CustomAccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h5">Mengapa Sewapedia?</Typography>
            </CustomAccordionSummary>
            <AccordionDetails>
              <Typography variant="h5" mb={4}>
                Disini anda bisa menyewa mainan yang anda inginkan untuk anda
                atau anak anda tanpa perlu membeli. Kalau sudah bosan tinggal
                kembalikan jadi anda tidak harus menyimpan barang yang anda
                tidak pakai. Betul?
              </Typography>
            </AccordionDetails>
          </CustomAccordion>
          <CustomAccordion
            square
            expanded={activeItem === "panel2"}
            onChange={handleChange("panel2")}
          >
            <CustomAccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography variant="h5">
                Bagaimana biaya peminjaman dan lama peminjaman?
              </Typography>
            </CustomAccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">
                Ga Perlu mahal, anda bisa menyewa mainan yang ada disini mulai
                dari 10 ribu saja dan waktu penyewaan mulai dari harian sampai
                dengan mingguan.
              </Typography>
            </AccordionDetails>
          </CustomAccordion>
          <CustomAccordion
            square
            expanded={activeItem === "panel3"}
            onChange={handleChange("panel3")}
          >
            <CustomAccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3-content"
              id="panel3-header"
            >
              <Typography variant="h5">
                Bagaimana Persyaratan untuk Menyewa disini?
              </Typography>
            </CustomAccordionSummary>
            <AccordionDetails>
              <Typography variant="h5" mb={4}>
                Persyaratannya mudah sekali untuk menyewa cukup upload KTP dan
                alamat anda sekarang. Dan selama penyewaan, pastikan anda
                memenuhi syarat umur dalam beberapa kategori.
              </Typography>
              <Typography variant="h5">
                Untuk yang berdomisili di luar jabodetabek harap mencantumkan
                dokumen lain seperti KTP anggota keluarga lain yang tidak
                serumah untuk syarat verifikasi.
              </Typography>
            </AccordionDetails>
          </CustomAccordion>
          <CustomAccordion
            square
            expanded={activeItem === "panel4"}
            onChange={handleChange("panel4")}
          >
            <CustomAccordionSummary
              // expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4-content"
              id="panel4-header"
            >
              <Typography variant="h5">
                Mengapa uang deposit harus dibayar dimuka?
              </Typography>
            </CustomAccordionSummary>
            <AccordionDetails>
              <Typography variant="h5">
                Karena uang deposit adalah jaminan uang untuk claim asuransi
                jika suatu waktu terjadi kecelakaan atau kerusakan pada mobil
                yang diakibatkan oleh kelalaian pengguna, semua kerusakan akan
                tercover oleh asuransi, namun jika perjalanan sewa kendaraan
                pada pengembalian kendaraan tidak ada kerusakan, uang deposit
                akan dikembalikan seluruhnya melalui transfer.
              </Typography>
            </AccordionDetails>
          </CustomAccordion>
        </Stack>
      </Container>
    </BorderedBottomBox>
  );
};

export default FAQ;
