import React from 'react'
import ContentEditable from 'react-contenteditable'

export class EditableElement extends React.Component {
    state = {
        html: this.props.text
    }
    contentEditable = React.createRef();

    componentDidMount() {
        console.log(this.props)
    }

    handleChange = evt => {
        this.setState({ html: evt.target.value });
    };

    render = () => {
        return (
            <>
            <ContentEditable
                innerRef={this.contentEditable}
                html={this.state.html} // innerHTML of the editable div
                disabled={false}       // use true to disable editing
                onChange={this.handleChange} // handle innerHTML change
                tagName= {this.props.type} // Use a custom HTML tag (uses a div by default)
            />
            <button onClick={()=>{this.props.save(this.props.field, this.contentEditable.current.innerText)}}>save</button>
            </>
        )
    }
}