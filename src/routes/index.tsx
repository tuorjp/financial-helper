import { useUserStore } from "../context/userStore"
import { ApplicationRoutes, LoginRoutes } from "./routes"

export default function RouterDecider() {
  // const user = true
  const { user } = useUserStore()
  return (
    <>
      {user ? <ApplicationRoutes /> : <LoginRoutes />}
    </>
  )
}
