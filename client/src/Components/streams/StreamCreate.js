import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
    renderError({ touched, error }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    // Problem of Context inside JS/React classes
    // we pass renderInput to a component so when renderInput is called its called with an unknown value of this
    // sol -> Arrow fun
    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? "error" : ""}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        );
    };

    // we got a callback fun passing into a fun so we need to bind it -> USING ARROW fun
    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    };

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                {/* Field component is used for any type of field input */}
                {/* When we pass some prop that field element dont know about the field component by default will pass those props to rhe renderInput function */}
                <Field
                    name="title"
                    component={this.renderInput}
                    label="Enter the Title"
                />
                <Field
                    name="description"
                    component={this.renderInput}
                    label="Enter the Description"
                />

                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = "You must enter a title";
    }

    if (!formValues.description) {
        errors.description = "You must enter a description";
    }

    return errors;
};

const formWrapped = reduxForm({
    form: "streamCreate",
    validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
