import Loading from "@/components/loading";
import useAuthStore from "@/store/authStore";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const LoginValidator = () => {
  const {
    isAuthenticated,
    getMe,
    logout,
  } = useAuthStore();
  const router = useRouter();
  const verifyLogged = async () => {
    const authJSON = localStorage.getItem("auth");
    const auth = await JSON.parse(authJSON || "");
    if (!auth.state.isAuthenticated) {
      router.push("/login");
    } else {
      const validLogin = await getMe();
      if (!validLogin) {
        logout();
        router.push("/login");
      }
    }
  };
  useEffect(() => {
    verifyLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{!isAuthenticated && <Loading />}</>;
};
export default LoginValidator;
