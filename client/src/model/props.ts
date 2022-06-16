import React from 'react';

export interface IModalProps {
  visible: boolean;
  handleCancel: React.MouseEventHandler<HTMLButtonElement>;
}
