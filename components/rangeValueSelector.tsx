import React from "react";
import {
  StyledView,
  StyledText,
  StyledTextInput,
  StyledPressable,
} from "@/components/styleds/components";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function RangeValueSelector({
  setFrom,
  from,
  setTo,
  to,
  labels,
  saveFilters,
}: {
  saveFilters: () => void;
  setFrom: (value: string) => void;
  from: string;
  setTo: (value: string) => void;
  to: string;
  labels: { from: string; to: string; placeholder: string; name: string };
}) {
  return (
    <>
      <StyledView className="mt-7">
        <StyledView className="w-full flex flex-row items-center justify-start gap-4">
          <StyledPressable onPress={saveFilters} className="min-w-10">
            <Icon name="arrow-back" size={25} color="#8B8B93" />
          </StyledPressable>

          <StyledView className="flex items-start justify-start w-full">
            <StyledText className="font-extrabold text-lg">
              {labels.name || ""}
            </StyledText>
          </StyledView>

          <StyledPressable className="min-w-10">
            <Icon name="search" size={18} color="#171717" />
          </StyledPressable>
        </StyledView>

        <StyledView className="h-[1px] bg-gray-400 my-4" />
      </StyledView>

      <StyledView className="flex flex-col w-full">
        {/* Input para valor "from" */}
        <StyledText className="text-xs font-semibold mb-2">
          {labels.from}
        </StyledText>
        <StyledTextInput
          placeholder={labels.placeholder}
          value={from}
          onChangeText={setFrom}
          keyboardType="numeric"
          className="py-3 px-4 text-sm border border-gray-300 rounded-[4px] mb-4"
        />

        {/* Input para valor "to" */}
        <StyledText className="text-xs font-semibold mb-2">
          {labels.to}
        </StyledText>
        <StyledTextInput
          placeholder={labels.placeholder}
          value={to}
          onChangeText={setTo}
          keyboardType="numeric"
          className="py-3 px-4 text-sm border border-gray-300 rounded-[4px]"
        />
      </StyledView>
    </>
  );
}
