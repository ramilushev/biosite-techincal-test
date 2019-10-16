import React, { MouseEvent } from 'react';
import './styles/Button.css';

interface ButtonProps {
	label?: string,
	className?: string,
	onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

export const Button = ({ label = 'Press ME!', className, onClick }: ButtonProps) => {
	return (
		<button
			className={`Button ${className}`}
			onClick={onClick}
		>
			{label}
		</button>
	)
}
