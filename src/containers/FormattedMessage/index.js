import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getLocale, getLocalizedMessage} from 'modules/i18n/selectors'
import {changeLocale, addMessages} from 'modules/i18n/actions'
import {addLocaleData} from 'react-intl';
import messageFormat from 'intl-messageformat';


class FormattedMessage extends Component {
    constructor(props) {
        super(props);
        this.messageFormat = null;
    }
    componentDidMount() {
        let {message, locale} = this.props;
        this.messageFormat = new messageFormat(message, locale);
    }
    componentWillReceiveProps({message:nextMessage, locale:nextLocale}) {
        let {locale, message} = this.props;
        if (locale !== nextLocale || message !== nextMessage)
            this.messageFormat = new messageFormat(nextMessage, nextLocale)
    }
    render() {
        const {locale, message, ...otherProps} = this.props;
        if (!this.messageFormat) return null;
        return (
            <span>{this.messageFormat.format(otherProps)}</span>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        locale: getLocale(state),
        message: getLocalizedMessage(state, ownProps.id)
    })
)(FormattedMessage)