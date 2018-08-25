import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

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
      return (
        <section>
          <div className="dropzone">
            <Dropzone onDrop={(files) => this.onDrop(files)} multiple={this.props.settings.multipleFiles}>
              <p>Try dropping some files here, or click to select files to upload.</p>
            </Dropzone>
          </div>
          <aside>
            <h2>Dropped files</h2>
            <ul>
              {
                this.state.files.map(f => <li key={f.name}><img src={f.preview} />{f.name} - {f.size} bytes</li>)
              }
            </ul>
          </aside>
        </section>
      );
    }
  }

  export default BasicDropzone;