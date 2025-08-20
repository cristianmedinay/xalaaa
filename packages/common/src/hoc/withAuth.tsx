/*
 * @author BSG <dev@bsgroup.eu>
 * @copyright Better Software Group S.A.
 * @version: 1.0
 */
import React from "react";
import { Subtract } from "utility-types";

import { AuthorizationHelper } from "../helpers";

export interface WithAuthProps {
  isAnonymous: boolean;
}

export const withAuth = <P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class WithAuth extends React.Component<Subtract<P, WithAuthProps>> {
    state = {
      isAnonymous: true,
    };

    async componentDidMount() {
      const isAnonymous = await AuthorizationHelper.isAnonymous();
      this.setState({ isAnonymous });
    }

    render() {
      return (
        <WrappedComponent
          {...(this.props as P)}
          {...(this.state as WithAuthProps)}
        />
      );
    }
  };
};
