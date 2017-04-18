import React, { Component } from 'react';
import { Link } from 'react-router';

import OrganizationStore from "../../stores/OrganizationStore";
import OrganizationForm from "../../components/OrganizationForm";

class UpdateOrganization extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor() {
    super();

    this.state = {
      organization: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillMount() {
    OrganizationStore.getOrganization(this.props.params.id, (organization) => {
      this.setState({
        organization: organization,
      });
    });
  }

  onSubmit(organization) {
    OrganizationStore.updateOrganization(this.props.params.id, organization, (responseData) => {
      this.context.router.push('organizations');
    });
  }

  render() {
    return(
      <div>
        <ol className="breadcrumb">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/organizations">Organizations</Link></li>
          <li><Link to={`/organizations/${this.props.params.id}`}>{this.state.organization.name}</Link></li>
          <li className="active">Edit organization</li>
        </ol>
        <hr />
        <div className="panel panel-default">
          <div className="panel-body">
            <OrganizationForm organization={this.state.organization} onSubmit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateOrganization;