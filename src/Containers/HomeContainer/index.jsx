import styled from "styled-components"
import { projectContext } from "../../Context/ProjectContext"
import QuienesSomos from "../../Components/QuienesSomos/index"
import Banners from "../../Components/Banners/index"
import { useContext } from "react"
import CursosCards from "../../Components/CursosCards"
import MainCarousel from '../../Components/MainCarousel/index';
import Sponsors from "../../Components/Sponsors/index"

const HomeContainer = ({setIsLoginOpen, loggedUser}) => {
	const { isLogin, setIsLogin } = useContext(projectContext)
	
	return (
		<>
			{isLogin ? (
				<Container>
					<div className="sesion">
						<p>Estás logueado</p>
						<button className="boton" onClick={() => setIsLogin(false)}>
							Cerrar
						</button>
					</div>
				</Container>
			) : (
				<>
					<MainCarousel setIsLoginOpen= {setIsLoginOpen} loggedUser={loggedUser}/>
					<Sponsors />
					<Container>
						<CursosCards />
						<CursosCards isProximos />
						<QuienesSomos />
					</Container>
					<Banners />
				</>
			)}
		</>
	)
}

export default HomeContainer

const Container = styled.div`
	height: auto;

	.sesion {
		margin-top: 30%;
	}
`
