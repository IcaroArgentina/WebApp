import React, { useState } from 'react';

import Select from 'react-select';
import theme from '../../Theme/base';

const CategoriesMobile = ({ toggleTab, categories }) => {
	const categorias = categories();
	const options = categorias.map(({ Nombre }) => {
		return { value: `${Nombre}`, label: `${Nombre}` };
	});

	const [selectedOption, setSelectedOption] = useState(options[0]);

	const handleChange = (e) => {
		const selected = options.find((option) => option.value === e.value);
		const searchedCategory = categories().find(
			(element) => element.Nombre === selectedOption
		);
		const searchedIndex = categories().indexOf(searchedCategory);

		toggleTab(searchedIndex, e.value);
		setSelectedOption(selected);
	};

	const customStyles = {
		container: (provided, state) => ({
			...provided,
			marginBottom: '15px',
		}),
		input: (provided, state) => ({
			...provided,
		}),
		option: (provided, state) => ({
			...provided,
			color: state.isSelected && 'white',
			background: state.isSelected ? `${theme.color.darkBlue}` : 'white',
		}),

		control: (provided) => ({
			...provided,
			width: '100%',
			boxShadow: 'hsl(0, 0%, 80%)',
			color: 'hsl(0, 0%, 80%)',
			borderColor: 'hsl(0, 0%, 80%)',
		}),
		singleValue: (provided) => ({
			...provided,
			fontSize: '1rem',
			fontFamily: 'Montserrat, sans-serif',
			padding: '0 0 0 6px',
		}),
		menu: (provided) => ({
			...provided,
			width: '100%',
		}),
	};

	return (
		<Select
			placeholder='Elige una categoria'
			defaultValue={selectedOption}
			onChange={handleChange}
			options={options}
			styles={customStyles}
			isSearchable={false}
		/>
	);
};

export default CategoriesMobile;
