import { Modal, TouchableOpacity } from "react-native";
import ArrowDown from "../icons/arrow-down";
import LocationPin from "../icons/locationPin";
import NotificationIcon from "../icons/notification";
import { StyledPressable, StyledText, StyledView } from "../styleds/components";
import { useState } from "react";
import ShippingLocationPicker from "../shippingLocationPicker";
import useShippingStore from "../../store/shippingStore";
import Icon from "react-native-vector-icons/AntDesign";
import { useRouter, Href } from "expo-router";

export default function LocationPicker() {
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [step, setStep] = useState(1);
  const { removeAddress, selectAddress, selectedAddress, addresses } =
    useShippingStore();

  const router = useRouter();

  return (
    <>
      <StyledView className="w-full flex flex-row items-center justify-between px-4">
        <StyledView className="flex flex-row items-center justify-start gap-4">
          <LocationPin />
          <TouchableOpacity
            onPress={() => setShowLocationPicker(!showLocationPicker)}
            style={{ flexDirection: "row", alignItems: "center", gap: 7 }}
          >
            <StyledText>
              {selectedAddress?.street_address
                ? selectedAddress.street_address[0]
                : "Selecione um endereço"}
            </StyledText>
            <ArrowDown color="#5ECD81" />
          </TouchableOpacity>
        </StyledView>
        <StyledView className="flex flex-row items-center justify-end gap-2">
          <StyledPressable
            onPress={() => router.push("/cart" as Href)}
            className="flex p-3 bg-[#E8EDF2] rounded-full"
          >
            <Icon name="shoppingcart" size={17} color="#0A0A0A" />
          </StyledPressable>
        </StyledView>
      </StyledView>
      <Modal
        transparent
        animationType="slide"
        visible={showLocationPicker && step === 1}
      >
        <StyledView
          className="w-full h-full p-6"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <StyledView className="bg-white w-full p-4 rounded flex flex-col items-center justify-center">
            <StyledView className="w-full flex flex-row items-center justify-between mb-4">
              <StyledText className="text-lg font-bold">
                Selecione um endereço
              </StyledText>
              <TouchableOpacity onPress={() => setShowLocationPicker(false)}>
                <StyledText className="text-white rounded-full bg-light-green w-8 h-8 text-center font-bold text-xl">
                  X
                </StyledText>
              </TouchableOpacity>
            </StyledView>
            {addresses.length > 0 &&
              addresses.map((item, key) => (
                <StyledView
                  key={key}
                  className="w-full flex flex-row items-center justify-between py-2"
                >
                  <TouchableOpacity
                    onPress={() => {
                      selectAddress(item), setShowLocationPicker(false);
                    }}
                  >
                    <StyledText className="w-full">
                      {item.street_address[0]}
                    </StyledText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      removeAddress(item);
                    }}
                  >
                    <Icon name="delete" size={24} color="#f00" />
                  </TouchableOpacity>
                </StyledView>
              ))}
            <TouchableOpacity onPress={() => setStep(2)}>
              <StyledText className="w-full bg-light-green py-1 px-3 rounded text-white">
                Adicionar endereço
              </StyledText>
            </TouchableOpacity>
          </StyledView>
        </StyledView>
      </Modal>
      <Modal
        visible={showLocationPicker && step === 2}
        transparent
        animationType="slide"
      >
        <ShippingLocationPicker
          close={() => {
            setShowLocationPicker(false);
            setStep(1);
          }}
        />
      </Modal>
    </>
  );
}
