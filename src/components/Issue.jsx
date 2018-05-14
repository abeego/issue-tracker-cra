import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const Issue = ({
	issue, issue: {
		name, description, created_at: createdAt, status, id,
	},
}) => (
	<Card
		className="issue"
		style={{ borderLeft: `4px solid  ${getColor(status)}` }}
	>
		<Card.Content>
			<Link
				href={`/issue/${id}`}
				to={{
					pathname: `/issue/${id}`,
					state: issue,
				}}
			>
				{name}
			</Link>
		</Card.Content>
		<Card.Content description={description} />
		<Card.Content description={createdAt} />
		<Card.Content description={status} />
	</Card>
);

const getColor = (status) => {
	switch (status) {
	case 'Planed': return '#e9253a';
	case 'In Progress': return '#5DC0EC';
	case 'Verified': return '#3d3d3d';
	case 'Done': return '#66ef54';
	default: break;
	}
};

Issue.propTypes = {
	issue: PropTypes.shape({
		name: PropTypes.string,
		description: PropTypes.string,
	}),
};

export default Issue;
