import React, { Component } from 'react';
import { Field, Control, Label, Input } from 'react-bulma-components/lib/components/form';
import Icon from 'react-bulma-components/lib/components/icon';
import { FiSearch } from 'react-icons/fi';

import './SearchBar.scss';

class SearchBar extends Component {
  state = {
    value: ''
  }

  timeout = null;

  doSearch = (event) => {
    this.setState({
      value: event.target.value
    });
    clearTimeout(this.timeout);
    this.timeout = setTimeout( () => {
      this.props.callback(this.state.value);
    }, 500);
  }

  render() {
    return(
      <>
        <div>
          <Field>
            <Label className="is-hidden">Search for a movie</Label>
            <Control iconLeft>
              <Input
                type="text"
                placeholder="Search for a movie"
                onChange={this.doSearch}
                value={this.state.value}
              />
              <Icon align="left">
                <FiSearch />
              </Icon>
            </Control>
          </Field>
        </div>
      </>
    )
  }
}

export default SearchBar;