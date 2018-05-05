import React from 'react';
import PropTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import ProjectPicture from '../images/project.png';

import '../styles/project.scss';

const Project = ({
  project: {
    id, name, description, created_at,
  },
}) => (
  <Item.Group className="project">
    <Item>
      <Item.Image size="small" src={ProjectPicture} />
      <Item.Content>
        <Item.Header><Link to={`/project/${id}`}>{name}</Link></Item.Header>
        <Item.Meta>Description:</Item.Meta>
        <Item.Description>{description}</Item.Description>
        <Item.Meta>Created:</Item.Meta>
        <Item.Description>{created_at}</Item.Description>
      </Item.Content>
    </Item>
</Item.Group>);

Project.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string,
    id: PropTypes.number, 
  }),
};

export default Project;