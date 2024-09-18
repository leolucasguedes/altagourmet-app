import React from "react";
import {
  StyledView,
  StyledText,
  StyledPressable,
} from "@/components/styleds/components";
import { Modal } from "react-native";
import { buttonCN, secButtonCN } from "./classnames";
import Icon from "react-native-vector-icons/MaterialIcons";

interface Action {
  action: () => void;
  label: string;
  type: "primary" | "secondary";
}

type PopupProps = {
  show: boolean;
  status: "error" | "cancel";
  title: string;
  Subtitle?: React.FC;
  actions: Action[];
  close: () => void;
};

const Popup: React.FC<PopupProps> = ({
  show,
  status,
  title,
  Subtitle,
  actions,
  close,
}) => {
  return (
    <Modal
      visible={show}
      transparent
      animationType="slide"
      onRequestClose={close}
    >
      <StyledView className="bg-primary bg-opacity-50 flex-1 justify-center items-center">
        <StyledView className="w-4/5 bg-white rounded-lg p-5">
          <StyledPressable onPress={close} className="py-2">
            <StyledView className="bg-grey w-16 h-1 rounded-full" />
          </StyledPressable>
          <Icon
            name={status === "error" ? "error-outline" : "highlight-remove"}
            size={18}
            color="#525252"
          />
          <StyledText className="text-lg font-bold">{title}</StyledText>
          {Subtitle && <Subtitle />}
          {actions.map((action, index) => (
            <StyledPressable
              key={index}
              onPress={action.action}
              className="w-full"
            >
              <StyledText
                className={action.type === "primary" ? buttonCN : secButtonCN}
              >
                {action.label}
              </StyledText>
            </StyledPressable>
          ))}
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default Popup;
