import React, { Component } from 'react';
import BasicDropzone from '../../components/BasicDropzone/BasicDropzone';
import FormValidator from '../../utilities/FormValidator';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/teamsActions';

class TeamInfo extends Component {
  constructor(props) {
    super(props);
    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name is required',
      },
    ]);

    let newState = {
      teamData: props.teamData,
      validation: this.validator.valid(),
      currentImage: null,
    };

    this.state = newState;

    this.submitted = false;
  }

  callbackDropzone = (files) => {
    let fileToUpload = null;
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        // do whatever you want with the file content
        fileToUpload = reader.result;

        this.setState({
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

  dropzoneSettings = {
    multipleFiles: false,
    callback: this.callbackDropzone,
    isImage: true,
  };

  handleInputChange = (event) => {
    event.preventDefault();

    this.setState({
      teamData: {
        ...this.state.teamData,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const validation = this.validator.validate(this.state.teamData);
    this.setState({ validation });

    this.submitted = true;

    if (validation.isValid) {
      let image = null;

      if (this.state.currentImage) {
        image = {
          data: this.state.currentImage.data,
          fileName: this.state.currentImage.fileName,
        };
      }
      this.props.saveTeam(image, this.state.teamData);
    }
  };

  render() {
    let validation = this.submitted // if the form has been submitted at least once
      ? this.validator.validate(this.state.teamData) // then check validity every time we render
      : this.state.validation; // otherwise just use what's in state

    return (
      <div>
        <h1>Team Basic Info</h1>
        <div className='row'>
          <div className='col-sm-9'>
            <form>
              <div className={validation.name.isInvalid && 'has-error'}>
                <label htmlFor='name'>Name</label>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  placeholder='team name'
                  onChange={this.handleInputChange}
                  value={this.state.teamData.name}
                />
                <span className='help-block'>{validation.name.message}</span>
              </div>

              <button
                onClick={this.handleFormSubmit}
                className='btn btn-primary'
              >
                Save
              </button>
            </form>
          </div>
          <div className='col-sm-3'>
            <img
              src={this.props.teamData.pictureLogo.url}
              height='100'
              width='100'
            />
            <BasicDropzone settings={this.dropzoneSettings} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTeam: state.teams.currentTeam,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveTeam: (image, teamData) =>
      dispatch(actionCreators.saveTeam(image, teamData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamInfo);
