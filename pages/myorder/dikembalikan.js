import { getToken } from 'next-auth/jwt'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { MyOrderCard, NoOrderYet } from '../../components/mypage/MyOrderCard'
import MyOrder from '../../components/mypage/MyOrderMenu'

export async function getServerSideProps({ req }) {
  const token = await getToken({ req })
  if (!token)
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    }
  return { props: {} }
}

export default function DiKembalikan() {
  const { data: session, status } = useSession()
  const [returned, setReturned] = useState([])

  async function getReturnedProduct() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/return`,
        {
          headers: {
            authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      if (res.ok) setReturned(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (status !== 'loading') getReturnedProduct()
  }, [status])

  return (
    <MyOrder>
      {returned.length ? (
        returned.map((item) => <MyOrderCard order={item} key={item.id} />)
      ) : (
        <NoOrderYet />
      )}
    </MyOrder>
  )
}
