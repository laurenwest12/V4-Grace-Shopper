import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategorySelector extends Component {
  constructor() {
    super();
    this.state = {
      categorySelected: '',
    };
  }

  handleChange = ({ target }) => {
    if (target.value === 0) {
      this.setState({ categorySelected: '' }, () => this.goToCategoryRoute());
    } else {
      this.setState({ categorySelected: target.value }, () =>
        this.goToCategoryRoute()
      );
    }
  };

  goToCategoryRoute = () => {
    const { categorySelected } = this.state;
    const routeToGoTo = `/products${
      categorySelected === '' ? '' : `/category/${categorySelected}`
    }`;
    this.props.history.push(routeToGoTo);
  };

  render() {
    const font = (selected) => {
      if (selected === this.state.categorySelected) {
        return '500';
      } else {
        return '400';
      }
    };
    return (
      <div>
        <ul className="selector-list">
          <h2>Products</h2>
          {this.props.categories.map((category) => {
            const { id, name } = category;
            return (
              <li
                key={id}
                value={id}
                onClick={this.handleChange}
                className="selector-list-item"
                style={{ fontWeight: font(id) }}
              >
                {name ? name : 'All'}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ categories }) => ({
  categories: [{ id: '', name: 'All' }, ...categories],
});

export default connect(mapStateToProps)(CategorySelector);
