import React, { Component } from 'react';
import BasicDropzone from '../../components/BasicDropzone/BasicDropzone';
import apiInstance from '../../utilities/axios-test';

class PlayerInfo extends Component {

	submitImage(image, fileName) {
		apiInstance.post('GlobalMedia/UploadBase64Image', 
			{ Base64String: image, FileName: fileName })
			.then(response => {
				this.props.playerData.picture = response.data;
				apiInstance.post('player/savePlayerDetails', 
					this.props.playerData)
				.then(response2 => {
					console.log(response2);
				})
		})
	}

	callbackDropzone(files) {
		let fileToUpload = null;
		files.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				// do whatever you want with the file content
				fileToUpload = reader.result;
				this.submitImage(fileToUpload, 'test.png');
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.readAsDataURL(file);
		});
	}

	dropzoneSettings = {
		multipleFiles: false,
		callback: this.callbackDropzone
	}

  render() {
    return (
      <div>
        <h1>Player Basic Info</h1>
        <img src={this.props.playerData.picture.url} height="20" width="20" />
        {this.props.playerData.name}
        {/* <button onClick={}>Save data!</button> */}
        <BasicDropzone settings={this.dropzoneSettings} />
        player info!!
      </div>
    );
  }


};

export default PlayerInfo;