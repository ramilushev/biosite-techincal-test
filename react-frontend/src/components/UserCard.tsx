import React, { FunctionComponent, useState } from 'react';
import './styles/UserCard.css'

interface UserCardProps {
  className?: string
}

export const UserCard: FunctionComponent<UserCardProps> = ({ className = '', children }) => {
  return (
    <div className={`UserCard ${className}`}>
      {children}
    </div>
  )
}