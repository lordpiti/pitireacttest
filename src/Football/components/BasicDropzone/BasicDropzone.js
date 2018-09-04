import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import './BasicDropzone.css';

class BasicDropzone extends Component {
    constructor(props) {
      super(props)
      this.state = { files: [] }
    }
  
    onDrop(files) {
        this.props.settings.callback(files);
      this.setState({
        files: files
      });
    }
  
    render() {

      let selectedFilesContent = null;

      if (this.state.files && this.state.files.length>0) {
        selectedFilesContent =   
        <aside>
          <h3>Selected Files</h3>
          <div className="row droppedFileInfo">
            {
              this.state.files.map(f => 
              <div className="col-sm-12" key={f.name}>
                <div className="row align-items-center">
                  <div className="col-sm-3">
                  <img src={f.preview} height="40" width="40" />
                  </div>
                  <div className="col-sm-9">
                  <span className="fileInfo">{f.name} - {f.size} bytes</span>
                  </div>
                </div>
                
                
              </div>)
            }        
          </div>
        </aside>
      }

      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={(files) => this.onDrop(files)} multiple={this.props.settings.multipleFiles}>
              <p>Select an image</p>
            </Dropzone>
          </div>
          {selectedFilesContent}
        </section>
      );
    }
  }

  export default BasicDropzone;