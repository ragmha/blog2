import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createPost } from "../actions";
import { Link } from "react-router-dom";

class PostsNew extends Component {
  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">
          {touched ? error : ""}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push("/");
    });
  }

  render() {
    const { handleSubmit } = this.props; // passed by redux-form :D
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title For Post"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  const { title, categories, content } = values;

  // Validate inputs
  if (!title) {
    errors.title = "Enter a title";
  }

  if (!categories) {
    errors.categories = "Enter some categories";
  }

  if (!content) {
    errors.content = "Enter some content please!";
  }

  // if errors is empty, form is valid! :D
  // if errors has any props , redux assumes form is invalid :(
  return errors;
}

export default reduxForm({
  validate,
  form: "PostsNewForm" // name of the form
})(connect(null, { createPost })(PostsNew));
