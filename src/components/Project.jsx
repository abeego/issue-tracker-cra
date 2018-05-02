import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';

import ProjectPicture from '../../images/project.png';

import '../scss/project.scss';

const Project = props => (
  <Item.Group className="project">
    <Item>
      <Item.Image size="small" src={ProjectPicture} />
      <Item.Content>
        <Item.Header as="a">{props.project.name}</Item.Header>
        <Item.Meta>Description:</Item.Meta>
        <Item.Description>{props.project.description}</Item.Description>
        <Item.Meta>Created:</Item.Meta>
        <Item.Description>{props.project.created_at}</Item.Description>
      </Item.Content>
    </Item>
  </Item.Group>
);

Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
  }),
};

export default Project;
