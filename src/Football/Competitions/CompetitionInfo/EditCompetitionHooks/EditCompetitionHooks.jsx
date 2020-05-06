import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { TextField, FormHelperText } from '@material-ui/core';
import editModal from '../../../components/EditModal/editModal';
import BasicDropzone from '../../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../../utilities/FormValidator';

const EditCompetitionInfo = ({
  competitionData,
  saveCompetition,
  handleClose,
  classes,
}) => {
  const validRegEx = (range) => /^\d{4}(-\d{4})$/.test(range);

  const validator = new FormValidator([
    {
      field: 'name',
      method: 'isEmpty',
      validWhen: false,
      message: 'Name is required',
    },
    {
      field: 'season',
      method: validRegEx,
      validWhen: true,
      message: 'Season is required and need to have the right format',
    },
  ]);

  const [currentImageState, setCurrentImageState] = useState({
    currentImage: null,
  });

  const [
    currentCompetitionDataState,
    setCurrentCompetitionDataState,
  ] = useState({
    ...competitionData,
  });

  const [currentValidationState, setCurrentValidationState] = useState({
    validation: validator.valid(),
  });

  let submitted = false;

  const callbackDropzone = (files) => {
    let fileToUpload = null;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;

        setCurrentImageState({
          currentImage: {
            data: fileToUpload,
            fileName: 'test.png',
          },
        });
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.readAsDataURL(file);
    });
  };

  const dropzoneSettings = {
    multipleFiles: false,
    callback: callbackDropzone,
    isImage: true,
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    setCurrentCompetitionDataState({
      ...currentCompetitionDataState,
      [event.target.name]: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const validation = validator.validate(currentCompetitionDataState);
    setCurrentValidationState({ validation });

    submitted = true;

    if (validation.isValid) {
      let image = null;

      if (currentImageState.currentImage) {
        image = {
          data: currentImageState.currentImage.data,
          fileName: currentImageState.currentImage.fileName,
        };
      }
      saveCompetition(image, currentCompetitionDataState);
      handleClose();
    }
  };

  let validation = submitted // if the form has been submitted at least once
    ? validator.validate(currentCompetitionDataState) // then check validity every time we render
    : currentValidationState.validation; // otherwise just use what's in state

  if (!competitionData) {
    return <div></div>;
  } else
    return (
      <div>
        <h1>Competition Basic Info</h1>
        <div className='row'>
          <div className='col-sm-7'>
            <form>
              <TextField
                required
                error={
                  validation.name.message !== undefined &&
                  validation.name.message !== ''
                }
                id='name'
                name='name'
                label='Competition name'
                defaultValue={currentCompetitionDataState.name}
                className={classes.textField}
                margin='normal'
                onChange={handleInputChange}
              />
              <FormHelperText>Required</FormHelperText>
              <TextField
                required
                error={
                  validation.season.message !== undefined &&
                  validation.season.message !== ''
                }
                id='season'
                name='season'
                label='Season'
                defaultValue={currentCompetitionDataState.season}
                className={classes.textField}
                margin='normal'
                onChange={handleInputChange}
              />
              <FormHelperText>Required</FormHelperText>
            </form>
          </div>
          <div className='col-sm-5 text-center'>
            <img
              className='roundedImage'
              src={competitionData.logo.url}
              height='100'
              width='100'
            />
            <BasicDropzone settings={dropzoneSettings} />
          </div>
        </div>
        <div className='text-right margin-top-medium'>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            onClick={handleFormSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    );
};

EditCompetitionInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  saveCompetition: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default editModal(EditCompetitionInfo);
