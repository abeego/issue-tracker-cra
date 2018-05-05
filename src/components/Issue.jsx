import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';

const Issue = ({ issue: { name, description, created_at: createdAt, status } }) => (
	<Card className="issue">
		<Card.Header>{name}</Card.Header>
		<Card.Meta>Description: </Card.Meta>
		<Card.Description>{description}</Card.Description>
		<Card.Meta>Created: </Card.Meta>
		<Card.Description>{createdAt}</Card.Description>
		<Card.Meta>Status: </Card.Meta>
		<Card.Description>{status}</Card.Description>
	</Card>
);

Issue.propTypes = {
	issue: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	}),
};

export default Issue;
