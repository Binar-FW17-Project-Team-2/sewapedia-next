import {
  Box,
  Button,
  Container,
  LinearProgress,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'
import { Form, Formik } from 'formik'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { TextInput } from '../../../components/CustomInput'
import DashboardLayout from '../../../components/dashboard/DashboardLayout'
import { validationAddProduct } from '../../../utils/validation'
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '../../../config/firebase'
import CloseIcon from '@mui/icons-material/Close'
import Image from 'next/image'

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  if (session.user.role !== 'admin') {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  }
  return { props: {} }
}

export default function EditProduct() {
  return (
    <Box sx={{ display: 'flex' }}>
      <DashboardLayout />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <FormEdit />
        </Container>
      </Box>
    </Box>
  )
}

function FormEdit() {
  const router = useRouter()
  const [product, setProduct] = useState({})
  const [imageUrl, setImageUrl] = useState([])
  const [category, setCategory] = useState([])
  const [errorInput, setErrorInput] = useState([])
  const [progress, setProgress] = useState(0)
  const [image, setImage] = useState()
  const { data: session } = useSession()

  async function getCategory() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category`
    )
    const data = await res.json()
    if (res.ok) setCategory(data)
  }
  useEffect(() => {
    getCategory()
  }, [])

  function inputImage(e) {
    if (!e.target.files) {
      return setImage(undefined)
    }
    setImage(e.target.files[0])
  }

  useEffect(() => {
    if (image) {
      handleUpload()
    }
  }, [image])

  function handleUpload() {
    const storageRef = ref(storage, `images/${Date.now()}+${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setImageUrl((prev) => [...prev, downloadUrl])
        })
      }
    )
  }

  async function deleteImage(idx) {
    try {
      const image = imageUrl[idx]
      const imageRef = ref(storage, image)
      await deleteObject(imageRef)
      setImageUrl((prev) => prev.filter((val, id) => id !== idx))
    } catch (error) {
      setImageUrl((prev) => prev.filter((val, id) => id !== idx))
    }
  }

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        position: 'relative',
        width: '100%',
        minHeight: '500px',
        paddingLeft: '40%',
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          backgroundColor: 'white',
          overflowX: 'hidden',
          overflowY: 'auto',
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white',
            padding: '4px solid white',
          },
          '&::-webkit-scrollbar': {
            width: '5px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '2px',
            backgroundColor: 'primary.light',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
          }}
        >
          {imageUrl.map((value, idx) => (
            <Box
              key={idx}
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                flexShrink: '0',
                mb: 1,
              }}
            >
              <Image src={value} alt={idx} layout="fill" priority={true} />
              <Button
                variant="contained"
                color="warning"
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  p: 0,
                  minWidth: 0,
                }}
                onClick={() => {
                  deleteImage(idx)
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
      <Formik
        initialValues={{
          name: product.name || '',
          stock: product.stock || '',
          price: product.price || '',
          details: product.details || '',
          category: product.category || '',
        }}
        enableReinitialize
        validationSchema={validationAddProduct}
        onSubmit={async (values) => {
          if (errorInput) return
          if (session) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/product/`,
              {
                method: 'POST',
                body: JSON.stringify({
                  name: values.name,
                  category: values.category,
                  details: values.details,
                  stock: values.stock,
                  price: values.price,
                  img_url: imageUrl,
                }),
                headers: {
                  authorization: `Bearer ${session.user.accessToken}`,
                  'Content-Type': 'application/json',
                },
              }
            )
            if (res.ok) router.push('/dashboard/products')
          }
        }}
      >
        {(formik) => (
          <Box
            component={Form}
            sx={{
              boxSizing: 'border-box',
              width: '80%',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
            <TextInput
              id="img_url"
              name="img_url"
              type="file"
              inputProps={{ accept: 'image/*' }}
              onChange={inputImage}
              onClick={() => setErrorInput(false)}
              {...(errorInput ? errorInput : null)}
            />
            <TextInput id="name" name="name" label="name" />
            <TextInput id="stock" name="stock" label="stock" type="number" />
            <TextInput id="price" name="price" label="price" type="number" />
            <TextInput
              id="category"
              name="category"
              select
              label="category"
              helperText="select category"
            >
              {category.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextInput>
            <textarea
              id="details"
              name="details"
              placeholder="details"
              rows={15}
              {...formik.getFieldProps('details')}
            />
            {formik.touched.details && formik.errors.details ? (
              <Typography variant="p" sx={{ color: 'red' }}>
                {formik.errors.details}
              </Typography>
            ) : null}

            <Button
              sx={{ mt: 1 }}
              type="submit"
              color="info"
              variant="contained"
              onClick={() => {
                if (!imageUrl.length)
                  return setErrorInput({
                    error: true,
                    helperText: 'wajib upload image',
                  })
              }}
            >
              ADD PRODUCT
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  )
}
