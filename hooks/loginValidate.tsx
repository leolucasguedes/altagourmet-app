import Loading from "../components/loading";
import useAuthStore from "../store/authStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

const LoginValidator = () => {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  useEffect(() => {
    if (loaded) {
      if (!isAuthenticated) router.push("/")
    }
  }, [loaded])

  useEffect(() => {
    setLoaded(true)
  }, [])

  return <>{!isAuthenticated && <Loading />}</>;
};
export default LoginValidator;
