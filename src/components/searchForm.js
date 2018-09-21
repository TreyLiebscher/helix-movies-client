import React from 'react';

import './searchForm.css';

export default class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        }

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const text = this.textInput.value.trim();
        if (text && this.props.onAdd) {
            this.props.onAdd(this.textInput.value);
        }
        this.textInput.value = '';
    }

    setEditing(editing) {
        this.setState({
            editing
        });
    }

    render() {
        if (!this.state.editing) {
            return (
                <div className="searchButton"
                onClick={() => this.setEditing(true)}>
                    <a href="#">Search for a movie</a>
                </div>
            );
        }

        return (
            <form className="searchForm" onSubmit={this.onSubmit}>
                <input type="text" ref={input => this.textInput = input} />
                <button>Search</button>
                <button type="button" onClick={() => this.setEditing(false)}>
                    Cancel
                </button>
            </form>
        );
    }
}