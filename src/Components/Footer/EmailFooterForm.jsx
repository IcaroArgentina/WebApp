import React, { useState } from 'react';

import styled from 'styled-components';
import theme from '../../Theme/base';

const EmailFooterForm = ({
	placeholder,
	sendEmail,
	completedEmail,
	setCompletedEmail,
}) => {
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	function handleChange(value) {
		setCompletedEmail(value);
		if (completedEmail?.length > 1 && completedEmail.includes('@')) {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	}

	return (
		<EmailForm>
			<label htmlFor='correo-electronico'>
				<StyledInput
					type='text'
					id='correo-electronico'
					name='correo-electronico'
					placeholder={placeholder}
					onChange={(e) => handleChange(e.target.value)}
				/>
			</label>
			<EnviarMail onClick={(e) => sendEmail(e)} disabled={isButtonDisabled}>
				Enviar
			</EnviarMail>
		</EmailForm>
	);
};

const EmailForm = styled.form`
	display: flex;
	gap: 5px;
`;

const StyledInput = styled.input`
	border: 1px solid ${theme.color.white};

	:focus {
		border: 1px solid ${theme.color.white};
		outline: none;
	}
`;

const EnviarMail = styled.button`
	border-radius: 5px;
	padding: 5px 10px;
	background-color: rgb(255, 255, 255);
	border: none;
	cursor: ${({ disabled }) => !disabled && 'pointer'};
	color: ${({ disabled }) =>
		disabled ? theme.color.disabled : theme.color.darkBlue};
	font-size: 0.825rem !important;
`;

export default EmailFooterForm;
