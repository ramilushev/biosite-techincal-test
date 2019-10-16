import React from 'react';

interface UserFieldProps {
  label: string
}

export const UserField: React.FC<UserFieldProps> = ({ label, children }) => {
  return (
    <div className="UserField">
      <div className="UserField-label">{`${label}: `}</div>
      <div>{children}</div>
    </div>
  )
}