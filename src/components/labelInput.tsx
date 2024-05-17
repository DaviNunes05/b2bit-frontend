import React from "react";

interface LabelInputProps {
	id: string;
	name: string;
	type: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
	value: string;
	placeholder: string;
}

const LabelInput: React.FC<LabelInputProps> = ({
	id,
	name,
	type,
	onChange,
	onBlur,
	value,
	placeholder,
}) => {
	return (
		<>
			<label htmlFor={id}>{name}</label>
			<input
				id={id}
				name={name}
				type={type}
				onChange={onChange}
				onBlur={onBlur}
				value={value}
				placeholder={placeholder}
				className="bg-[#F1F1F1]"
			/>
		</>
	);
};

export default LabelInput;
