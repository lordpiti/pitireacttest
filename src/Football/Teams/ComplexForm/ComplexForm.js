import React, { Component } from 'react';
import './Form.css';
import FormValidator from '../../utilities/FormValidator';

class ComplexForm extends Component {
  constructor() {
    super();

    this.validator = new FormValidator([
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      },
      {
        field: 'phone',
        method: 'isEmpty',
        validWhen: false,
        message: 'Pleave provide a phone number.'
      },
      {
        field: 'phone',
        method: 'matches',
        args: [/^\(?\d\d\d\)? ?\d\d\d-?\d\d\d\d$/], // args is an optional array of arguements that will be passed to the validation method
        validWhen: true,
        message: 'That is not a valid phone number.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password is required.'
      },
      {
        field: 'password_confirmation',
        method: 'isEmpty',
        validWhen: false,
        message: 'Password confirmation is required.'
      },
      {
        field: 'password_confirmation',
        method: this.passwordMatch,   // notice that we are passing a custom function here
        validWhen: true,
        message: 'Password and password confirmation do not match.'
      },
      {
        field: 'selected_items',
        method: this.selectedlessThan2Items,   // notice that we are passing a custom function here
        validWhen: false,
        message: 'You must select at least 2 items.'
      }
    ]);

    this.state = {
      email: '',
      phone: '',
      password: '',
      password_confirmation: '',
      validation: this.validator.valid(),
      selected_items: [{ name: 'item 1', value: false },
      { name: 'item 2', value: false },
      { name: 'item 3', value: false }]
    }

    this.submitted = false;
  }

  passwordMatch = (confirmation, state) => (state.password === confirmation)

  selectedlessThan2Items = () => {
    
    return (this.state.selected_items.filter(x => x.value).length < 2 && this.submitted);
  }

  handleInputChange = event => {
    event.preventDefault();

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleInputChange2 = (event, index) => {

    const items = this.state.selected_items.slice();
    items[index].value = event.target.checked;

    this.setState({
      items: items
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    
    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      // handle actual form submission here
    }
  }

  render() {

    let validation = this.submitted ?                         // if the form has been submitted at least once
      this.validator.validate(this.state) :   // then check validity every time we render
      this.state.validation                   // otherwise just use what's in state

    return (
      <div>

        <form className="demoForm">
          <h2>Sign up</h2>

          <div className={validation.email.isInvalid && 'has-error'}>
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control"
              name="email"
              placeholder="john@doe.com"
              onChange={this.handleInputChange}
            />
            <span className="help-block">{validation.email.message}</span>
          </div>

          <div className={validation.phone.isInvalid && 'has-error'}>
            <label htmlFor="phone">Phone</label>
            <input type="phone" className="form-control"
              name="phone"
              placeholder="(xxx)xxx-xxxx"
              onChange={this.handleInputChange}
            />
            <span className="help-block">{validation.phone.message}</span>
          </div>

          <div className={validation.password.isInvalid && 'has-error'}>
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control"
              name="password"
              onChange={this.handleInputChange}
            />
            <span className="help-block">{validation.password.message}</span>
          </div>

          <div className={validation.password_confirmation.isInvalid && 'has-error'}>
            <label htmlFor="password_confirmation">Password Again</label>
            <input type="password" className="form-control"
              name="password_confirmation"
              onChange={this.handleInputChange}
            />
            <span className="help-block">{validation.password_confirmation.message}</span>
          </div>

          <div className={validation.selected_items.isInvalid && 'has-error'}>

            {this.state.selected_items.map((item, index) =>
              <div key={index}>
                <label htmlFor={item.name}>{item.name}</label>
                <input
                  name={item.name}
                  type="checkbox" className="form-control"
                  checked={this.state.selected_items[index].value}
                  onChange={(event) => this.handleInputChange2(event, index)} />
                <span className="help-block">{item.name}</span>
              </div>
            )}
            <span className="help-block">{validation.selected_items.message}</span>
          </div>
          <button onClick={this.handleFormSubmit} className="btn btn-primary">
            Sign up
        </button>
        </form>
      </div>

    )
  }
}
export default ComplexForm;