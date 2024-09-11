import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Action {
  action: () => void;
  label: string;
  type: 'primary' | 'secondary';
}

interface PopupProps {
  show: boolean;
  status: 'error' | 'cancel';
  title: string;
  Subtitle?: React.FC;
  actions: Action[];
  close: () => void;
}

const Popup: React.FC<PopupProps> = ({ show, status, title, Subtitle, actions, close }) => {
  if (!show) return null;

  return (
    <Modal transparent visible={show} animationType="slide">
      <StyledView className="flex-1 justify-end bg-black/50">
        <StyledView className="w-full flex items-center bg-white rounded-t-2xl p-6">
          <StyledTouchableOpacity onPress={close} className="py-2">
            <StyledView className="bg-grey w-16 h-1 rounded-full" />
          </StyledTouchableOpacity>
          <StyledText className="text-xl font-bold mb-4">{title}</StyledText>
          {Subtitle && <Subtitle />}
          {actions.map((action, index) => (
            <StyledTouchableOpacity
              key={index}
              onPress={action.action}
              className={`${
                action.type === 'primary' ? 'bg-primary text-white' : 'bg-white border-primary'
              } py-3 px-10 my-2 rounded w-full items-center`}
            >
              <StyledText className={`${action.type === 'primary' ? 'text-white' : 'text-primary'} font-bold`}>
                {action.label}
              </StyledText>
            </StyledTouchableOpacity>
          ))}
        </StyledView>
      </StyledView>
    </Modal>
  );
};

export default Popup;
