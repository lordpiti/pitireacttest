import React from 'react';
import BasicDropzone from '../../components/BasicDropzone/BasicDropzone';
import apiInstance from '../../../axios-test';

const CompetitionInfo = (props) => {

	const submitImage = (image, fileName) => {
		apiInstance.post('GlobalMedia/UploadBase64Image', 
			{ Base64String: image, FileName: fileName })
			.then(response => {
				console.log(response);
		})
	}

	const callbackDropzone = (files) => {
		let fileToUpload = null;
		files.forEach(file => {
			const reader = new FileReader();
			reader.onload = () => {
				// do whatever you want with the file content
				fileToUpload = reader.result;
				submitImage(fileToUpload, 'test.png');
			};
			reader.onabort = () => console.log('file reading was aborted');
			reader.onerror = () => console.log('file reading has failed');
			reader.readAsDataURL(file);
		});
	}

	const dropzoneSettings = {
		multipleFiles: false,
		callback: callbackDropzone
	}

	return (
		<div>
			<h1>Competition Basic Info</h1>
			<img src={props.competitionData.logo.url} />
			<BasicDropzone settings={dropzoneSettings} />
			competition info!!
		</div>
	)
};

export default CompetitionInfo;