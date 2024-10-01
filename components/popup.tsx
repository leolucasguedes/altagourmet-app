import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { StyledText } from "./styleds/components";
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
      <View style={{
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }}>
        <View style={{
            width: "100%",
            height: 410,
            backgroundColor: "#fff",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: 20,
            alignItems: "center",
            position: "absolute",
            bottom: 0,
          }}>
          <Pressable onPress={close} style={{
              paddingVertical: 10,
              alignItems: "center",
            }}>
            <View style={{
              width: 60,
              height: 4,
              backgroundColor: "#ccc",
              borderRadius: 2,
            }} />
          </Pressable>
          <Icon
            name={status === "error" ? "error-outline" : "highlight-remove"}
            size={108}
            color="#5ECD81"
            style={{
              marginVertical: 10,
            }}
          />

          {/* Title */}
          <StyledText className="font-normal text-2xl mb-2">{title}</StyledText>

          {/* Subtitle */}
          {Subtitle && <Subtitle />}

          {/* Actions */}
          {actions.map((action, index) => (
            <Pressable
              key={index}
              onPress={action.action}
              style={[
                {
                  width: "100%",
                  paddingVertical: 12,
                  borderRadius: 8,
                  marginTop: 12,
                  alignItems: "center",
                },
                action.type === "primary"
                  ? {
                    backgroundColor: "#5ECD81",
                    maxWidth: 345,
                    width: "100%",
                    borderRadius: 4,
                    marginTop: 25,
                  }
                  : {
                    backgroundColor: "transparent",
                    borderWidth: 2,
                    borderColor: "#5ECD81",
                    maxWidth: 345,
                    width: "100%",
                    borderRadius: 4,
                  },
              ]}
            >
              <StyledText
                className={`font-normal ${
                  action.type === "primary" ? "text-white" : "text-[#5ECD81]"
                }`}
              >
                {action.label}
              </StyledText>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default Popup;
