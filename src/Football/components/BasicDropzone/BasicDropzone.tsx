import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import styles from './BasicDropzone.module.scss';

interface BasicDropzoneSettings {
  isImage: boolean;
  multipleFiles: boolean;
  callback: Function;
}

interface BasicDropzoneProps {
  settings: BasicDropzoneSettings;
}

interface FileWithPreview extends File {
  preview?: any;
}

interface BasicDropzoneState {
  files: FileWithPreview[];
  invalidFiles: File[];
}

class BasicDropzone extends Component<BasicDropzoneProps, BasicDropzoneState> {
  constructor(props: BasicDropzoneProps) {
    super(props);
    this.state = { files: [], invalidFiles: [] };
  }

  onDrop(files: FileWithPreview[]) {
    let filesWithPreview = files;
    const invalidFiles: File[] = [];
    //needed to get the preview image for the thumbnail
    if (this.props.settings.isImage) {
      filesWithPreview = [];
      files.forEach((file) => {
        if (file.type.includes('image')) {
          filesWithPreview.push(
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          );
        } else {
          // TODO: add validation errors
          invalidFiles.push(file);
        }
      });
    }

    this.props.settings.callback(filesWithPreview);
    this.setState({
      files: filesWithPreview,
      invalidFiles: invalidFiles,
    });
  }

  render() {
    return (
      <section>
        <div className='dropzone'>
          <Dropzone
            onDrop={(files) => this.onDrop(files)}
            multiple={this.props.settings.multipleFiles}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div className={styles.dropzonedroparea} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Select an image</p>
                </div>
              </section>
            )}
          </Dropzone>
        </div>
        {this.state.files && this.state.files.length > 0 && (
          <aside>
            <h3>Selected Files</h3>
            <div className={styles.droppedFileInfo + ' row'}>
              {this.state.files.map((f) => (
                <div className='col-sm-12' key={f.name}>
                  <div className='row align-items-center'>
                    <div className='col-sm-3'>
                      {this.props.settings.isImage && (
                        <img src={f.preview} height='40' width='40' alt='' />
                      )}
                    </div>
                    <div className='col-sm-9'>
                      <span className={styles.fileInfo}>
                        {f.name} - {f.size} bytes
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
        <div className='row'>
          <div className='col-sm-12'>
            {this.state.invalidFiles.length > 0 && (
              <div className='row'>The selected file is not an image</div>
            )}
          </div>
        </div>
      </section>
    );
  }
}

export default BasicDropzone;
