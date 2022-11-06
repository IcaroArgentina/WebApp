import { FiSettings } from "react-icons/fi"
import styled from "styled-components"
import theme from "../../../../Theme/base"

const SettingsIcon = ({ props }) => {
	return (
		<Container {...props}>
			<FiSettings size={30} className="settings" />
		</Container>
	)
}

const Container = styled.div`
	.settings {
		color: ${theme.color.white};
		:hover {
			cursor: pointer;
		}
	}
`
export default SettingsIcon
