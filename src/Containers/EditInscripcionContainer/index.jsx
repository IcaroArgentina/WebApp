import {
  convertDateToTimestamp,
  normalizeSelectOptions,
  sortArrayByOrderNumber,
  turnTimestampIntoDateFormat,
} from '../../Utils';
import { doc, updateDoc } from 'firebase/firestore';
import {
  errorToast,
  successToast,
} from '../../Components/Shared/Toasts/ToastList';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BlueButton from '../../Components/Shared/Buttons/BlueButton';
import LinearBttn from '../../Components/Shared/Buttons/LinearBttn';
import Loader from '../../Components/Shared/Loader';
import Select from 'react-select';
import Spacer from '../../Components/Shared/Spacer';
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from 'react-icons/vsc';
import db from '../../Firebase/index';
import styled from 'styled-components';
import theme from '../../Theme/base';
import { projectContext } from '../../Context/ProjectContext';

const EditInscripcionContainer = ({
  fieldsList,
  type,
  title,
  userOptions,
  comisionesOptions,
  selectOptions,
  inscripcionesList,
}) => {
  const { editElement } = useParams();
  const [disabledButton, setDisabledButton] = useState(true);
  const [selectedEditElement, setSelectedEditElement] = useState([]);
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [programasLenght, setProgramasLenght] = useState(1);
  const { toastList, setToastList } = useContext(projectContext);

  /* eslint-disable */
  useEffect(() => {
    if (inscripcionesList.length > 0) {
      const filtered = inscripcionesList.find(
        (item) => item.id === editElement
      );
      setSelectedEditElement(filtered);
      setPending(false);
    }
  }, [inscripcionesList]);

  const comisionesCursos = comisionesOptions.map((elem) => {
    return { nombre: elem.nombreCurso, uuid: elem.uuid };
  });

  const comisionesFromCoursesOptions = comisionesOptions.filter((elem) => {
    return (
      elem.nombreCurso ===
      (newData.inscripcionCurso || selectedEditElement?.inscripcionCurso)
    );
  });

  const userOptionsFiltered = userOptions.filter((elem) => {
    return elem.rol !== 'administrador';
  });

  function showToast(type, content) {
    let selectedToast = [];
    switch (type) {
      case 'success':
        selectedToast = successToast(content, toastList);
        break;
      case 'error':
        selectedToast = errorToast(content, toastList);
        break;
      default:
        break;
    }
    setToastList([selectedToast]);
  }

  sortArrayByOrderNumber(fieldsList);
  const categoriesOptions = normalizeSelectOptions(selectOptions);

  useEffect(() => {
    Object.values(newData).length > 0
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [newData, fieldsList]);

  function handleClose() {
    setNewData({});
    navigate(`/admin/${type.toLowerCase()}`, { replace: true });
  }

  function handleChange(name, value, isPlanDeEstudio, isRelatedTo, isDate) {
    if (isPlanDeEstudio) {
      const plan = selectedEditElement.planDeEstudioContent;
      plan[isPlanDeEstudio.index][`${name}`] = value;
      plan[`${isPlanDeEstudio.index}`].orden = isPlanDeEstudio.index;

      setNewData((newData) => ({ ...newData, planDeEstudioContent: plan }));
    } else if (isRelatedTo) {
      selectedEditElement[`${name}`] = value;
      selectedEditElement[`${isRelatedTo}`] = getDefaultValue(isRelatedTo);
      setNewData((newData) => ({
        ...newData,
        [name]: value,
        [isRelatedTo]: getDefaultValue(isRelatedTo),
      }));
    } else if (isDate) {
      const convertedDate = convertDateToTimestamp(value, true);
      setNewData((newData) => ({ ...newData, [name]: convertedDate }));
    } else {
      setNewData((newData) => ({ ...newData, [name]: value }));
    }
  }

  function getDefaultValue(nombre) {
    if (nombre === 'href') {
      return getAuthomaticPath(nombre);
    } else if (nombre === 'CategoriaID' && type === 'Categoria') {
      return createAuthomaticId(nombre);
    } else if (nombre === 'CategoriaID') {
      return getCategoryID();
    }
    return '';
  }
  function getCategoryID() {
    if (selectedEditElement?.categoria?.length > 1) {
      const selectedCategoria = selectOptions.filter(
        (elem) => elem.Nombre === selectedEditElement.categoria
      );
      return selectedCategoria[0].CategoriaID;
    }
  }
  function getAuthomaticPath(nombre) {
    if (newData?.nombre?.length > 1) {
      const generatedPath = newData.nombre.toLowerCase().replaceAll(' ', '-');
      return generatedPath;
    }
  }

  function addNewProgram(e) {
    e.preventDefault();
    setProgramasLenght(programasLenght + 1);
    selectedEditElement?.planDeEstudioContent?.push({});
    setNewData((newData) => ({
      ...newData,
      planDeEstudioContent: selectedEditElement.planDeEstudioContent,
    }));
  }

  function removeProgram(e) {
    e.preventDefault();
    if (programasLenght > 1) {
      setProgramasLenght(programasLenght - 1);
      selectedEditElement?.planDeEstudioContent?.pop();
      setNewData((newData) => ({
        ...newData,
        planDeEstudioContent: selectedEditElement.planDeEstudioContent,
      }));
    }
  }

  function createAuthomaticId(nombre) {
    if (newData?.Nombre?.length > 1) {
      const generatedId = newData.Nombre.toLowerCase().replaceAll(' ', '');
      return generatedId;
    }
  }

  function getElementType(inputType, elem) {
    switch (inputType) {
      case 'select':
        const selectedOption =
          elem.options === 'cusosOptions'
            ? normalizeSelectOptions(comisionesCursos)
            : elem.options === 'comisionesOptions'
            ? normalizeSelectOptions(comisionesFromCoursesOptions)
            : elem.options === 'userOptions'
            ? normalizeSelectOptions(userOptionsFiltered)
            : elem.options;

        const defaultValue =
          elem.options === 'cusosOptions'
            ? selectedOption.filter(
                (op) => op.name === selectedEditElement[elem.nombre]
              )
            : elem.options === 'comisionesOptions'
            ? selectedOption.filter(
                (op) =>
                  op.id ===
                  (newData[elem.nombre] || selectedEditElement?.[elem.nombre])
              )
            : elem.options === 'userOptions'
            ? selectedOption.filter(
                (op) => op.value === selectedEditElement[elem.nombre].uuid
              )
            : selectedOption.filter(
                (op) => op.value === selectedEditElement[elem.nombre]
              );

        return (
          <SelectContainer hasExtraMargin={!elem.helpText}>
            <Select
              options={selectedOption}
              onChange={(value) =>
                handleChange(elem.nombre, value.name, null, elem.isRelatedTo)
              }
              isDisabled={elem.isDisableEdit}
              placeholder={`Seleccione ${elem.inputLabel}`}
              defaultValue={defaultValue}
            />
          </SelectContainer>
        );
      case 'file':
        return (
          <>
            <FileInput id="inputFile" name="file" type="file" />
            <Label htmlFor="inputFile" hasExtraMargin={!elem.helpText}>
              <ImgPreview src={selectedEditElement[elem.nombre]} />
              <div>
                <span>Seleccionar archivo</span>
                <span>{'Límite 2 mb'}</span>
              </div>
            </Label>
          </>
        );
      case 'textFile':
        return (
          <>
            <FileInput id="inputFile" name="file" type="file" />
            <Label htmlFor="inputFile" hasExtraMargin={!elem.helpText}>
              <ImgPreview src={selectedEditElement[elem.nombre]} />
              <FormInput
                hasExtraMargin={!elem.helpText}
                withBorder
                type="text"
                onChange={(e) => handleChange(elem.nombre, e.target.value)}
                disabled={elem.isDisabled}
                defaultValue={
                  selectedEditElement[elem.nombre] || elem.defaultValue
                }
              />
            </Label>
          </>
        );
      case 'textarea':
        return (
          <TextareaAutosize
            onChange={(e) => handleChange(elem.nombre, e.target.value)}
            minRows={3}
            placeholder={elem.helpText}
            className="styled-text-area"
            defaultValue={selectedEditElement[elem.nombre]}
          />
        );

      case 'titleContent':
        return (
          <TitleContentContainer>
            <TitleContentInputs>
              {Array.from({ length: programasLenght }, (_, i) => (
                <SingleInputsGroup key={i}>
                  <p>Titulo</p>
                  <FormInput
                    hasExtraMargin={!elem.helpText}
                    withBorder
                    type="text"
                    onChange={(e) =>
                      handleChange('titulo', e.target.value, {
                        index: i,
                        order: selectedEditElement[elem.nombre][i]?.orden,
                      })
                    }
                    defaultValue={
                      selectedEditElement[elem.nombre][i]?.titulo || ''
                    }
                    disabled={elem.isDisabled}
                  />
                  <p>Contenido</p>
                  <TextareaAutosize
                    onChange={(e) =>
                      handleChange('contenido', e.target.value, {
                        index: i,
                        order: selectedEditElement[elem.nombre][i]?.orden,
                      })
                    }
                    minRows={3}
                    className="styled-text-area"
                    defaultValue={
                      selectedEditElement[elem.nombre][i]?.contenido || ''
                    }
                  />
                </SingleInputsGroup>
              ))}
            </TitleContentInputs>
            <AddNewButton onClick={(e) => addNewProgram(e)}>+</AddNewButton>
            <RemoveButton
              disabled={programasLenght <= 1}
              onClick={(e) => removeProgram(e)}
            >
              -
            </RemoveButton>
          </TitleContentContainer>
        );
      case 'date':
        return (
          <FormInput
            hasExtraMargin={!elem.helpText}
            withBorder={elem.type === 'text' || elem.type === 'number'}
            type={elem.type}
            onChange={(e) =>
              handleChange(elem.nombre, e.target.value, null, null, true)
            }
            defaultValue={
              turnTimestampIntoDateFormat(selectedEditElement[elem.nombre]) ||
              elem.defaultValue
            }
            disabled={elem.isDisabled}
          />
        );

      default:
        return (
          <FormInput
            hasExtraMargin={!elem.helpText}
            withBorder={elem.type === 'text' || elem.type === 'number'}
            type={elem.type}
            onChange={(e) =>
              handleChange(elem.nombre, e.target.value, null, elem.isRelatedTo)
            }
            disabled={elem.isDisabled}
            defaultValue={selectedEditElement[elem.nombre] || elem.defaultValue}
          />
        );
    }
  }

  function handleSubmit(e) {
    setUpdateLoading(true);
    if (disabledButton) return;
    if (newData && selectedEditElement) {
      const ref = doc(
        db,
        `Usuarios/${selectedEditElement.user.uuid}/Inscripciones`,
        selectedEditElement.id
      );
      updateDoc(ref, newData);
    } else {
      showToast('error', 'Ha ocurrido un error');
    }
    setTimeout(() => {
      handleClose();
    }, 2000);
  }

  if (pending || !selectedEditElement) return <Loader />;

  return (
    <NewElementMainContainer>
      <HeaderTitle>
        <Title>
          {title}{' '}
          {selectedEditElement['Nombre'] || selectedEditElement['nombre']}
        </Title>

        <CloseButton onClick={handleClose}>
          <VscClose size={20} />
        </CloseButton>
      </HeaderTitle>
      {updateLoading ? (
        <Loader />
      ) : (
        <>
          <StyledForm>
            {fieldsList.map((elem, index, array) => (
              <FormLabel
                key={`${elem.nombre}${elem.id}`}
                htmlFor={elem.nombre}
                elemWidth={elem.width}
              >
                <>
                  {elem.nroOrden}. {elem.inputLabel}
                  {elem.isRequired && (
                    <RequiredText>* Campo obligatorio</RequiredText>
                  )}
                  {elem.helpText && elem.type !== 'textarea' && (
                    <Small>{elem.helpText}</Small>
                  )}
                  {getElementType(elem.type, elem)}
                </>
              </FormLabel>
            ))}
          </StyledForm>
          <SubmitContainer>
            <LinearBttn type="cancel" onClick={handleClose}>
              Cancelar
            </LinearBttn>
            <BlueButton
              width="100%"
              borderRadius="10px"
              padding="5px 13px"
              backgroundColor={
                disabledButton ? theme.color.disabledBlue : theme.color.darkBlue
              }
              type="submit"
              disabled={disabledButton}
              onClick={(e) => handleSubmit(e)}
            >
              Guardar
            </BlueButton>
          </SubmitContainer>
          <Spacer height={100} />
        </>
      )}
    </NewElementMainContainer>
  );
};

const NewElementMainContainer = styled.div`
  padding: 20px;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Title = styled.h3`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  width: 90%;
  color: #1744ff;
`;
const CloseButton = styled.div`
  background: transparent;
  border: unset;
  font-size: 20px;
  cursor: pointer;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  margin: 0 auto;

  .styled-text-area {
    display: block;
    width: 100%;
    height: 35px !important;
    border: 1px solid #e6e6e6;
    resize: none;
    margin-top: 20px;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    font-family: ${theme.fontFamily.primary};

    ::placeholder {
      display: block;
      font-family: ${theme.fontFamily.primary};
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: ${theme.color.grey};
      margin: 10px 0px;
    }

    :focus {
      font-family: ${theme.fontFamily.primary};
      border: 1px solid ${theme.color.darkBlue};
      outline: none;
      border-radius: 5px;
      font-size: 1rem;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
    }
  }
`;

const FormLabel = styled.label`
  width: ${({ elemWidth }) => elemWidth};
  display: block;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${theme.color.grey};
  margin: 10px 0px;
`;
const SelectContainer = styled.div`
  margin-top: ${({ hasExtraMargin }) => (hasExtraMargin ? '26px' : 0)};
`;

const Small = styled.p`
  display: block;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.color.grey};
  text-transform: none;
  margin: 5px 0;
`;
const RequiredText = styled.p`
  display: inline;
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  color: ${theme.color.redError};
  margin: 10px 0px;
  text-transform: none;
  margin: 0 10px;
`;

const FormInput = styled.input`
  display: block;
  width: 100%;
  height: 30px;
  border: ${({ withBorder }) => withBorder && '1px solid #e6e6e6'};
  font-family: ${theme.fontFamily.primary};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  margin-top: ${({ hasExtraMargin }) => (hasExtraMargin ? '26px' : 0)};

  :focus {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    border: 1px solid ${theme.color.darkBlue};
    outline: none;
    border-radius: 5px;
    font-size: 1rem;
    font-family: ${theme.fontFamily.primary};
  }

  ::placeholder {
    display: block;
    font-family: ${theme.fontFamily.primary};
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: ${theme.color.grey};
    margin: 10px 0px;
  }
`;
const SubmitContainer = styled.div`
  width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const FileInput = styled.input`
  display: none;
`;

const TitleContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
`;
const TitleContentInputs = styled.div`
  width: 90%;
`;
const SingleInputsGroup = styled.div`
  border-bottom: 3px solid ${theme.color.lightGrey};
  padding: 10px;
`;
const AddNewButton = styled.button`
  background-color: ${theme.color.darkBlue};
  color: ${theme.color.white};
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;
const RemoveButton = styled.button`
  background-color: ${({ disabled }) =>
    disabled ? theme.color.disabledBlue : theme.color.darkBlue};
  color: ${theme.color.white};
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  cursor: pointer;
`;

const Label = styled.label`
  margin-top: ${({ hasExtraMargin }) => (hasExtraMargin ? '26px' : 0)};
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  background-color: ${theme.color.white};
  cursor: pointer;
  text-align: start;
  padding: 0;
  font-family: ${theme.fontFamily.primary};
  font-size: ${({ mobile }) => (mobile ? null : '1rem')};
  font-weight: ${({ mobile }) => (mobile ? null : '400')};
  line-height: ${({ mobile }) => (mobile ? null : '1.25rem')};

  span:nth-child(1) {
    color: ${theme.color.darkGrey};
    width: 45%;
    text-align: center;
    background-color: #e5e5e5;
    padding: 0.5rem 0;
    border: ${({ mobile }) => (mobile ? null : '1px solid  #E5E5E5')};
  }
  span:nth-child(2) {
    font-size: 0.9rem;
    text-align: center;
    width: 55%;
    padding: 0.5rem;
    flex: 1;
    border: ${({ mobile }) => (mobile ? null : '1px solid  #E5E5E5')};
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 500;
  }
`;

const ImgPreview = styled.img`
  width: 420px;
  height: 100px;
`;

export default EditInscripcionContainer;
