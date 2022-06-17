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

export default function BelumBayar() {
  const { data: session, status } = useSession()
  const [orders, setOrders] = useState([])

  async function getOrderUnpayed() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/order/unpayed`,
        {
          headers: {
            authorization: `Bearer ${session.user.accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await res.json()
      if (res.ok) setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (session) getOrderUnpayed()
  }, [status])

  return (
    <MyOrder>
      {orders.length ? (
        orders.map((order) => <MyOrderCard order={order} key={order.id} />)
      ) : (
        <NoOrderYet />
      )}
    </MyOrder>
  )
}
