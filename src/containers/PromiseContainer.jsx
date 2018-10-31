// Please disregard this file as it is related to StreamingInfo

import React, { Component } from 'react';
import propTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

function getRouteKey(props) {
    return props.location && props.location.key ? props.location.key : null
}

export default class PromiseContainer extends Component {


    static propTypes = {
        renderFn: propTypes.func.isRequired,
        promise: propTypes.func.isRequired
    }

    //props: renderFn and promise
    constructor(props) {
        super(props)
        this.state = {
            key: null, //enable router dependent state by tracking router.location.key
            promise: this.props.promise,
            resolved: null, //null, true or false
            resolvedValue: null
        }
        this.__mounted = false
    }

    componentDidMount() {
        this.__mounted = true
        this.firePromise()
    }

    componentWillUnmount() {
        this.__mounted = false
    }

    setStateSafe(...args) {
        if (!this.__mounted) {
            return
        }
        return this.setState(...args)
    }

    componentDidUpdate() {
        const newKey = getRouteKey(this.props)
        const { key } = this.state

        if (key !== newKey) {
            this.setStateSafe({ key: newKey }, () => {
                    this.firePromise()
            })
        }
    }

    firePromise() {

        const { promise, ...rest } = this.props
        this.props.promise(rest)
            .then(resolvedValue => {
                this.setStateSafe({ resolved: true, resolvedValue })
            })
            .catch(err => {
                this.setStateSafe({ resolved: false, resolvedValue: err })
            })
    }


    render() {
        const { resolved, resolvedValue} = this.state
        if (resolved === null) {
            return (
                <div>Loading....</div>
            )
        }
        if (resolved === false) {
            return (
                <div>There was an error, <a href="#" onClick={ev => { ev.preventDefault(); this.firePromise() }}>retry</a>?</div>
            )
        }
        const props = { ...this.props, resolvedValue}
        return this.props.renderFn(props)
    }

}

export const PromiseContainerWithRouter = withRouter(PromiseContainer)