import React, { useEffect, useState } from "react";
import {
  StyledScrollView,
  StyledView,
  StyledText,
  StyledPressable,
} from "../components/styleds/components";
import { Switch } from "react-native-switch";
import useAuthStore from "../store/authStore";
import useSearchStore, { Filters } from "../store/searchStore";
import Icon from "react-native-vector-icons/Ionicons";

export default function FiltersChooser({
  close,
  isFilter,
  modalName,
  name,
}: {
  close: () => void;
  isFilter?: (value: any) => void;
  modalName: keyof Filters;
  name?: string;
}) {
  const { token } = useAuthStore();
  const { filters, brands, categories, subcategories, loadOptions } =
    useSearchStore();
  const [selectedFilters, setSelectedFilters] = useState<any[]>([]);
  let options: any[] = [];
  if (modalName === "brand") options = brands;
  if (modalName === "category") options = categories;
  if (modalName === "subcategory") options = subcategories;
  if (modalName === "size") {
    options = [
      { name: "Pequeno", value: "small" },
      { name: "Médio", value: "medium" },
      { name: "Grande", value: "large" },
      { name: "Extra-Grande", value: "extra-large" },
    ];
  }

  useEffect(() => {
    if (token && modalName !== "size") {
      loadOptions(token);
    }
  }, [token]);

  useEffect(() => {
    if (filters[modalName]) {
      setSelectedFilters(filters[modalName] as string[]);
    }
  }, [modalName, filters]);

  const toggleFilter = (option: any) => {
    if (selectedFilters.includes(option)) {
      setSelectedFilters(selectedFilters.filter((i) => i !== option));
    } else {
      setSelectedFilters([...selectedFilters, option]);
    }
  };

  const saveFilters = () => {
    if (isFilter) {
      isFilter(selectedFilters);
    }
    close();
  };

  return (
    <>
      <StyledView className="mt-7 mb-2">
        <StyledView className="w-full flex items-center justify-start gap-4 relative">
          <StyledPressable
            onPress={saveFilters}
            className="min-w-10 absolute -left-4 -top-8"
          >
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>
        </StyledView>
      </StyledView>

      <StyledScrollView className="w-full">
        {options.map((option, index) => (
          <StyledPressable key={index} onPress={() => toggleFilter(option)}>
            <StyledView className="flex flex-row justify-between p-2">
              <StyledText>{option.name.toUpperCase()}</StyledText>
              <Switch
                value={selectedFilters.includes(option.name)}
                onValueChange={() => toggleFilter(option.name)}
                circleSize={20}
                barHeight={25}
                backgroundActive={"#5ECD81"}
                backgroundInactive={"#D1D5DB"}
                renderActiveText={false}
                renderInActiveText={false}
              />
            </StyledView>
          </StyledPressable>
        ))}
      </StyledScrollView>
    </>
  );
}
