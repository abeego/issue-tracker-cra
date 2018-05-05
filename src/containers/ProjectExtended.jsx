import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Header, Loader, Image } from 'semantic-ui-react';

import ProjectPicture from '../images/project.png';
import Issue from '../components/Issue';

import { fetchProject } from '../actions/projects';

class ProjectExtended extends Component {
	componentWillMount() {
		const { match: { params: { id } } } = this.props;
		if (id) this.props.fetchProject(id, this.props.token);
	}

	groupBy(items, key) {
		return	items.reduce(
			(result, item) => ({
				...result,
				[item[key]]: [
					...(result[item[key]] || []),
					item,
				],
			}), 
			{},
		)
	}

	sortIssues(issues) {
		const sortedIssues = this.groupBy(issues, 'status');
		const order = ['Planed', 'In Progress', 'Verified', 'Done'];
		return order.map(key => (
			<div className="issues-column" key={key}>
				<h3 className="issues-column-header">{key}</h3>
				{ sortedIssues[key].map(issue =>	(
					<Issue key={issue.name} issue={issue} />
				))}
			</div>));
	}

	render() {
		return (
			<div className="project-extended">
				<Link href="/projects" to="/projects">Go back to Projects Page</Link>
				<Loader active={!this.props.selectedProject} content="Fetching project" />
				{this.props.selectedProject && (
					<React.Fragment>
						<Header as="h2">
							<React.Fragment>
								<Image src={ProjectPicture} />
								{this.props.selectedProject.name}
							</React.Fragment>
						</Header>
						<div className="issues">
							{this.sortIssues(this.props.selectedProject.issues)} 
						</div>
					</React.Fragment>
				)}
			</div>
		);
	}
}

ProjectExtended.propTypes = {
	fetchProject: PropTypes.func,
	token: PropTypes.string,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	selectedProject: PropTypes.shape({
		name: PropTypes.string,
		issues: PropTypes.array,
	}),
};

const mapStateToProps = state => ({
	selectedProject: state.projects.selectedProject,
	token: (state.auth && state.auth.access && state.auth.access.token)
		? state.auth.access.token
		: null,
}
);

const mapDispatchToProps = dispatch => ({
	fetchProject: (id, token) => dispatch(fetchProject(id, token)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectExtended));
