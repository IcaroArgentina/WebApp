import {
  convertDateToTimestamp,
  getCollectionName,
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
import DeleteIcon from '../../Components/Shared/Icons/DeleteIcon';
import LinearBttn from '../../Components/Shared/Buttons/LinearBttn';
import Loader from '../../Components/Shared/Loader';
import Select from 'react-select';
import Spacer from '../../Components/Shared/Spacer';
import TextareaAutosize from 'react-textarea-autosize';
import { VscClose } from 'react-icons/vsc';
import db from '../../Firebase/index';
import { projectContext } from '../../Context/ProjectContext';
import styled from 'styled-components';
import theme from '../../Theme/base';

const EditElementContainer = ({ fieldsList, type, title, selectOptions }) => {
  const { editElement } = useParams();
  const [disabledButton, setDisabledButton] = useState(true);
  const [newData, setNewData] = useState({});
  const navigate = useNavigate();
  const [pending, setPending] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [programasLenght, setProgramasLenght] = useState(1);
  const { toastList, setToastList } = useContext(projectContext);

  const {
    courseCompleteList,
    categoriesCompleteList,
    nextCoursessCompleteList,
    usuariosList,
  } = useContext(projectContext);
  const [selectedEditElement, setSelectedEditElement] = useState('');

  function findElement() {
    switch (type) {
      case 'Cursos':
        return courseCompleteList.find((elem) => elem.uuid === editElement);
      case 'Categorias':
        return categoriesCompleteList.find((elem) => elem.uuid === editElement);
      case 'Comisiones':
        return nextCoursessCompleteList.find(
          (elem) => elem.uuid === editElement
        );
      case 'Usuarios':
        return usuariosList.find((elem) => elem.uuid === editElement);

      default:
        break;
    }
  }

  /* eslint-disable */
  useEffect(() => {
    if (
      courseCompleteList.length > 0 &&
      categoriesCompleteList.length > 0 &&
      nextCoursessCompleteList.length > 0
    ) {
      const elemResult = findElement();
      setSelectedEditElement(elemResult);

      if (type === 'Cursos' || type === 'Curso') {
        setProgramasLenght(
          selectedEditElement?.planDeEstudioContent?.length || 1
        );
      }

      setPending(false);
    }
  }, [
    courseCompleteList,
    categoriesCompleteList,
    editElement,
    nextCoursessCompleteList,
    selectedEditElement?.planDeEstudioContent,
  ]);

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
    setToastList([...toastList, selectedToast]);
  }

  sortArrayByOrderNumber(fieldsList);
  const categoriesOptions = normalizeSelectOptions(selectOptions);

  useEffect(() => {
    const requiredFields = fieldsList
      .filter((elem) => elem.isRequired)
      .map((item) => item.nombre);

    Object.values(newData).length > 0 &&
    requiredFields.every((ai) => {
      return newData[ai]?.length > 1 || newData[ai] !== '';
    })
      ? setDisabledButton(false)
      : setDisabledButton(true);
  }, [newData, fieldsList]);

  function handleClose() {
    setSelectedEditElement('');
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
      newData[`${name}`] = value;
      newData[`${isRelatedTo}`] = getDefaultValue(isRelatedTo);
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
    } else if (
      nombre === 'CategoriaID' &&
      (type === 'Categoria' || type === 'Categorias')
    ) {
      return createAuthomaticId(nombre);
    } else if (nombre === 'CategoriaID') {
      return getCategoryID();
    } else if (nombre === 'precioComisionDto') {
      return getPreciocDto();
    }
    return '';
  }

  function getCategoryID() {
    if (newData?.categoria?.length > 1) {
      const selectedCategoria = selectOptions.filter(
        (elem) => elem.Nombre === newData.categoria
      );
      return selectedCategoria[0].CategoriaID;
    }
  }

  function getPreciocDto() {
    if (newData?.precioComision?.length > 1) {
      const dtoValue = 20 / 100;
      const newPrecio =
        newData?.precioComision - newData?.precioComision * dtoValue;
      return newPrecio;
    }
  }

  function getAuthomaticPath(nombre) {
    if (newData?.nombre?.length > 1) {
      const generatedPath = newData.nombre
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('#', '')
        .replaceAll('.', '');
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

  function deleteParragraph(i) {
    if (programasLenght > 1) {
      selectedEditElement?.planDeEstudioContent.splice(i, 1);
      setNewData((newData) => ({
        ...newData,
        planDeEstudioContent: selectedEditElement.planDeEstudioContent,
      }));
      setProgramasLenght(newData?.planDeEstudioContent?.length);
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
        return (
          <SelectContainer hasExtraMargin={!elem.helpText}>
            <Select
              options={elem.options || categoriesOptions}
              onChange={(value) =>
                handleChange(elem.nombre, value.name, null, elem.isRelatedTo)
              }
              placeholder="Seleccione categoria"
              defaultValue={{
                name: selectedEditElement[elem.nombre],
                id: selectedEditElement[elem.nombre],
                label: selectedEditElement[elem.nombre],
                value: selectedEditElement[elem.nombre],
                key: selectedEditElement[elem.nombre],
              }}
            />
          </SelectContainer>
        );
      case 'file':
        return (
          <>
            <FileInput
              id="inputFile"
              name="file"
              type="file"
              value={newData[elem.nombre]}
            />
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
                value={newData[elem.nombre]}
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
            value={newData[elem.nombre]}
          />
        );

      case 'titleContent':
        return (
          <TitleContentContainer>
            <TitleContentInputs>
              {Array.from({ length: programasLenght }, (_, i) => (
                <div style={{ display: 'flex' }} key={`${elem.nombre}${i}`}>
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
                      value={
                        newData[elem.nombre] && newData[elem.nombre][i]?.titulo
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
                      value={
                        newData[elem.nombre] &&
                        newData[elem.nombre][i]?.contenido
                      }
                    />
                  </SingleInputsGroup>
                  <div style={{ marginTop: '26px' }}>
                    <DeleteIcon
                      disabled={programasLenght > 1}
                      onClick={(e) => deleteParragraph(i)}
                    >
                      -
                    </DeleteIcon>
                  </div>
                </div>
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
              (selectedEditElement[elem.nombre].seconds &&
                turnTimestampIntoDateFormat(
                  selectedEditElement[elem.nombre]
                )) ||
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
            value={newData[elem.nombre]}
          />
        );
    }
  }

  function handleSubmit(e) {
    setUpdateLoading(true);
    if (disabledButton) return;
    if (newData) {
      const collection = getCollectionName(type);
      const ref = doc(db, collection, selectedEditElement.uuid);
      updateDoc(ref, newData);
      showToast('success', 'Se ha modificado el elemento');
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
                key={`${elem.nombre}${elem.id}${index}`}
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
  width: 90%;
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

export default EditElementContainer;
