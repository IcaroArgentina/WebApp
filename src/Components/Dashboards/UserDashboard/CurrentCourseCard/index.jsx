import React, { useContext, useEffect, useState } from 'react';
import { useGetColors, useIsMobile } from '../../../../Hooks/Client';

import { hexcodeToRGBA } from '../../../../Helpers/colors';
import { projectContext } from '../../../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { turnTimestampIntoDate } from '../../../../Utils';

const CurrentCourseCard = ({ course }) => {
	const { nextCourses } = useContext(projectContext);
	const [currentCourse, setCurrentCourse] = useState();
	const mobile = useIsMobile();

	useEffect(() => {
		setCurrentCourse(
			nextCourses.find(
				(elem, index, array) => elem.nombreCurso === course.nombre
			)
		);
	}, [nextCourses, currentCourse]); //eslint-disable-line

	const fechaInicio =
		currentCourse && turnTimestampIntoDate(currentCourse.fechaInicio);

	return (
		<CurrentCourseCardContainer mobile={mobile}>
			<BannerContainer
				mobile={mobile}
				src={course.bannerImage}
				colorFilter={course.CategoriaID}></BannerContainer>
			<Container mobile={mobile}>
				<Title mobile={mobile}>{course.nombre}</Title>

				<Paragraph mobile={mobile}>
					Lunes y viernes: 8 a 10 AM <br />
					{fechaInicio}
				</Paragraph>
			</Container>
		</CurrentCourseCardContainer>
	);
};

export default CurrentCourseCard;

const CurrentCourseCardContainer = styled.div`
	width: ${({ mobile }) => (mobile ? '14rem !important' : '20rem !important')};
	margin: 0 0 0.5rem 0;
	background: #ffffff;
	border: 1px solid #c1c1c1;
	border-radius: 10px;
	flex: 0 0 auto;
	display: flex;
	flex-direction: column;
`;

const BannerContainer = styled.div`
	height: ${({ mobile }) => (mobile ? '78px' : '42%')};
	background-image: url(${({ src }) => src});
	background-position: center;
	background-size: cover;
	box-shadow: inset 0 0 0 1000px
		${({ colorFilter }) => hexcodeToRGBA(useGetColors(colorFilter), 0.75)};
	border-radius: 10px 10px 0 0;
	margin: ${({ mobile }) => mobile && '0 0 0.3rem 0'};
`;

const Container = styled.div`
	flex: 1;
	width: 77.5%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Title = styled.h5`
	font-family: ${theme.fontFamily.primary};
	font-size: ${({ mobile }) => (mobile ? '0.875rem' : '1.25rem')};
	font-weight: ${({ mobile }) => (mobile ? null : '700')};
	line-height: ${({ mobile }) => (mobile ? '1.05rem' : '1.5rem')};
	margin: ${({ mobile }) => (mobile ? '0' : '0.5rem 0 1.2rem 0')};
	text-align: center;
	color: #363636;
`;
const Paragraph = styled.p`
	font-family: ${theme.fontFamily.primary};
	font-size: ${({ mobile }) => (mobile ? '0.75rem' : '1rem')};
	font-weight: ${({ mobile }) => (mobile ? null : '500')};
	line-height: ${({ mobile }) => (mobile ? '1.05rem' : '1.25rem')};
	margin: ${({ mobile }) => (mobile ? '0.6rem 0 0 0' : '0 0 0 0')};
	text-align: center;
	color: #363636;
`;
