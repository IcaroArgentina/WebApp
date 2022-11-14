import { doc, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';

import ConfirmIcon from './../../../Shared/Icons/ConfirmIcon/index';
import DeleteIcon from '../../../Shared/Icons/DeleteIcon';
import Loader from '../../../Shared/Loader';
import RejectIcon from './../../../Shared/Icons/RejectIcon/index';
import { SOLICITUDESROWS } from '../../../../Constants/Solicitudes';
import Spacer from '../../../Shared/Spacer';
import db from '../../../../Firebase/index';
import { storage } from './../../../../Firebase/index';
import styled from 'styled-components';
import theme from '../../../../Theme/base';
import { useEffect } from 'react';
import { useGetColors } from '../../../../Hooks/Client';
import { useState } from 'react';

const SolicitudesAdmin = ({ usuariosList }) => {
	const [url, setUrl] = useState('');
	const [list, setList] = useState([]);

	useEffect(() => {
		const requiredCertificate = usuariosList.filter((elem) => elem.Certificado);

		requiredCertificate.forEach((elem) => {
			const name = `Certificado_${elem.uuid}`;
			const reference = ref(storage, `Certificados/${name}`);

			getDownloadURL(reference).then((url) =>
				setUrl((current) => [...current, { id: elem.uuid, certificate: url }])
			);
		});

		setList(
			requiredCertificate.sort(function (a, b) {
				const orden = a.Certificado?.date + a.Certificado?.hour;
				const orden2 = b.Certificado?.date + b.Certificado?.hour;

				if (orden > orden2) {
					return -1;
				}
				if (orden < orden2) {
					return 1;
				}
				return 0;
			})
		);
	}, [usuariosList]);

	const downloadCertificate = (element) => {
		const match = url.find((elem) => elem.id === element.uuid);
		const link = document.createElement('a');
		link.href = match.certificate;
		link.setAttribute('target', '_blank');
		link.click();
	};

	const handleCertificate = async (e, name, userId) => {
		e.preventDefault();
		const userRef = doc(db, `Usuarios/${userId}`);
		const date = Date.now();

		if (name === 'approve') {
			updateDoc(userRef, {
				Certificado: {
					estado: 'Aprobado',
					date: new Date(date).toLocaleDateString(),
					hour: new Date(date).toLocaleTimeString(),
					nombre: `Certificado_${userId}`,
				},
			});
		}
		if (name === 'reject') {
			updateDoc(userRef, {
				Certificado: {
					estado: 'Rechazado',
					date: new Date(date).toLocaleDateString(),
					hour: new Date(date).toLocaleTimeString(),
				},
			});
		}
		if (name === 'reset') {
			updateDoc(userRef, {
				Certificado: null,
			});
		}
	};
	return (
		<Container>
			<TitleContainer>
				<Title>Listado de Solicitudes</Title>
				<Spacer height={70} />
			</TitleContainer>
			<TableContent>
				<TableHeader>
					{SOLICITUDESROWS.map((elem) => (
						<TableColumn
							key={`${elem.inputLabel}${elem.id}`}
							isHeader
							isEmail={elem.nombre === 'email' ? true : false}>
							{elem.inputLabel}
						</TableColumn>
					))}
				</TableHeader>
				{list.map((el, index) => (
					<TableRow key={index}>
						<TableColumn>{el.name}</TableColumn>
						<TableColumn>{el.lastname}</TableColumn>
						<TableColumn isEmail={true}>{el.email}</TableColumn>
						<TableColumn>{el.dni}</TableColumn>
						<TableColumn isLink={true} onClick={() => downloadCertificate(el)}>
							{!url ? (
								<Loader size={15} marginVertical={1} border={2} flex={true} />
							) : (
								'Ver certificado'
							)}
						</TableColumn>
						<TableColumn>{el.Certificado?.estado}</TableColumn>
						<TableColumn icon={true}>
							<ConfirmIcon
								style={{ padding: '2px !important' }}
								onClick={(e) => handleCertificate(e, 'approve', el.uuid)}
							/>
							<RejectIcon
								onClick={(e) => handleCertificate(e, 'reject', el.uuid)}
							/>
							<DeleteIcon
								onClick={(e) => handleCertificate(e, 'reset', el.uuid)}
							/>
						</TableColumn>
						<TableColumn>
							{el.Certificado?.date} - {el.Certificado?.hour}
						</TableColumn>
					</TableRow>
				))}

				{list.length < 1 && <p>No tienes solicitudes por procesar</p>}
			</TableContent>
		</Container>
	);
};
const Container = styled.div`
	height: 65vh;
	min-height: 65vh;
`;

const TitleContainer = styled.div`
	display: flex;
	width: 85%;
	margin: auto;
	align-items: center;
	justify-content: space-between;
`;

const Title = styled.h3`
	font-family: ${({ mobile }) =>
		mobile ? null : `${theme.fontFamily.primary}`};
	margin: 0;
	font-weight: 700;
	font-size: ${({ mobile }) => (mobile ? null : '1.25rem')};
	line-height: 24px;
	color: #29343e;
`;

const TableContent = styled.div`
	height: 100%;
	padding: 10px 20px;
	overflow-y: scroll;
	::-webkit-scrollbar {
		display: none;
	}
`;
const TableHeader = styled.header`
	display: flex;
	gap: 10px;
	text-align: left;
	font-family: ${theme.fontFamily.tertiary};
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
	line-height: 24px;
	color: ${theme.color.darkGrey};
`;
const TableRow = styled.div`
	display: flex;
	flex-direction: row;
	text-align: left;
	gap: 10px;
	padding: 10px 0;

	:hover {
		background-color: ${({ isHidden }) => !isHidden && ' #f1f1f1'};
		cursor: pointer;
	}
`;
const TableColumn = styled.div`
	${({ isEmail }) => (isEmail ? `width: 300px !important` : `width: 150px`)};
	${({ isHeader }) => !isHeader && `color: ${theme.color.grey};`}
	background-color: ${({ bgcolor }) => bgcolor && useGetColors(bgcolor)};
	color: ${({ bgcolor }) => bgcolor && theme.color.white};
	${({ isEditDelete }) =>
		isEditDelete && 'display: flex; justify-content: space-evenly'};
	text-align: center;
	margin: 0 2px;
	${({ icon }) =>
		icon
			? 'display: flex; justify-content: space-evenly; align-items:center'
			: 'display: flex;	justify-content: center;	align-items: center;'};
	overflow: hidden;
	${({ isLink }) => isLink && `:hover{text-decoration: underline;}`};
`;

export default SolicitudesAdmin;
