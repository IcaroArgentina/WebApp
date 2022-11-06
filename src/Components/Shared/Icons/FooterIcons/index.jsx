import { BsWhatsapp, BsInstagram, BsFacebook } from "react-icons/bs"

const SocialMediaIcon = ({ type, size }) => {
	const styles = {
		marginRight: "15px",
	}
	function getIcon() {
		switch (type) {
			case "whatsapp":
				return <BsWhatsapp size={size} style={styles} />
			case "instagram":
				return <BsInstagram size={size} style={styles} />
			case "facebook":
				return <BsFacebook size={size} style={styles} />
			default:
				break
		}
	}

	return <>{getIcon()}</>
}

export default SocialMediaIcon
