import useAuthStore from "@/store/authStore";
import { formatPhoneNumber, obterUrlBase } from "@/utils/textFormat";
import LogoIcon from "./icons/logo";
import { StyledImage, StyledView, StyledText } from "./styleds/components";

const ProfileHead = () => {
  const { user } = useAuthStore();

  return (
    <>
      <StyledView className="rounded-full bg-border-grey h-[135px]  w-[135px] flex items-center justify-center mt-5">
        <StyledView className="rounded-full bg-white h-[130px] w-[130px] flex items-center justify-center">
          {user?.avatar &&
          !user.avatar.startsWith("https://ui-avatars.com/") ? (
            <StyledImage
              source={{
                uri:
                  obterUrlBase(process.env.NEXT_PUBLIC_API_URL || "") +
                  "/storage/" +
                  user.avatar,
              }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
              resizeMode="cover"
            />
          ) : (
            <LogoIcon fillColor="#238878" />
          )}
        </StyledView>
      </StyledView>
      <StyledView className="flex flex-col items-center justify-center p-3 w-full">
        <StyledText className="font-extrabold">{user?.name || "teste"}</StyledText>
        <StyledText className="font-extralight">
          {formatPhoneNumber(user?.phone) || "teste"}
        </StyledText>
      </StyledView>
    </>
  );
};

export default ProfileHead;
