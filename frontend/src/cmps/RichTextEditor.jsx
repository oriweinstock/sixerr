
import React from 'react'
import { convertToRaw, Editor, EditorState, getDefaultKeyBinding, RichUtils } from 'draft-js'
import '../../node_modules/draft-js/dist/Draft.css'
import draftToHtml from "draftjs-to-html";

// 
class RichTextEditor extends React.Component {
    state = {
        innerHtml: '',
    }
    constructor(props) {
        super(props);
        this.state = { editorState: EditorState.createEmpty() };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => this.setState({ editorState });

        this.handleKeyCommand = this._handleKeyCommand.bind(this);
        this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind(this);
        this.toggleBlockType = this._toggleBlockType.bind(this);
        this.toggleInlineStyle = this._toggleInlineStyle.bind(this);
    }
    componentDidMount() {
        // if(!this.props.desc) this.state = { editorState: EditorState.createEmpty() };
        // console.log('this.props.desc!!!', this.props.desc);
        // console.log('propss!!!!!!', this.props.desc);
        // const { editorState } = this.state
        // if (editorState) this.onSetHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        this.setState({ innerHtml: this.props.desc })
    }


    _handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _mapKeyToEditorCommand(e) {
        if (e.keyCode === 9 /* TAB */) {
            const newEditorState = RichUtils.onTab(
                e,
                this.state.editorState,
                4, /* maxDepth */
            );
            if (newEditorState !== this.state.editorState) {
                this.onChange(newEditorState);
            }
            return;
        }
        return getDefaultKeyBinding(e);
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    onSetHtml = (newHtml) => {
        this.setState({ innerHtml: newHtml })
    }
    handleChange = ({ target }) => {
        const field = target.name
        console.log("field", field)
        let value = target.value
        console.log("value", value)
    }



    render() {
        const desc = this.props.desc
        // if(document.querySelector('.RichEditor-root')) document.querySelector('.RichEditor-root').innerHTML=`${desc}`
        if (document.querySelector('.data-text')) {
            let span = document.querySelector('.data-text')
            console.log("document.querySelector('.data-text')!!!", document.querySelector('.data-text'))
            span.innerHtml = `5`
        }
        // if (document.querySelector('.RichEditor-root')) document.querySelector('.RichEditor-root').innerHTML = `${desc}`
        // if (document.querySelector('.RichEditor-editor')) document.querySelector('.RichEditor-editor').innerHTML = `${desc}`
        // if (document.querySelector('.public-DraftStyleDefault-block public-DraftStyleDefault-ltr span')) document.querySelector('.public-DraftStyleDefault-block public-DraftStyleDefault-ltr span').innerHTML = `${desc}`


        console.log("render , desc", desc)
        if (this.state.innerHtml) console.log("innerHtml", this.state.innerHtml)
        const { editorState } = this.state;
        console.log("render , editorState", editorState)
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

        // blockRendererFn?: (block: ContentBlock) => ?Object
        return (
            <div className="RichEditor-root main-layout">
                <BlockStyleControls
                    editorState={editorState}
                    onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                    editorState={editorState}
                    onToggle={this.toggleInlineStyle}
                />
                {/* <div dangerouslySetInnerHTML={{__html:`${desc}`}}>

                </div> */}
                <div className={className} onClick={this.focus}   >
                    <Editor
                        blockStyleFn={getBlockStyle}
                        customStyleMap={desc}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        keyBindingFn={this.mapKeyToEditorCommand}
                        onChange={this.onChange}
                        placeholder={this.state.innerHtml}
                        ref="editor"
                        spellCheck={true}
                        textDirectionality={desc}
                        editable={false}
                    />
                    <button onClick={() => this.props.onSaveHtml(draftToHtml(convertToRaw(editorState.getCurrentContent())))}>Save</button>
                </div>
            </div>
        );
    }
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        default: return null;
    }
}

class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
                {this.props.label}
            </span>
        );
    }
}

const BLOCK_TYPES = [
    { label: 'H1', style: 'header-one' },
    { label: 'H2', style: 'header-two' },
    { label: 'H3', style: 'header-three' },
    { label: 'H4', style: 'header-four' },
    { label: 'H5', style: 'header-five' },
    { label: 'H6', style: 'header-six' },
    { label: 'Blockquote', style: 'blockquote' },
    { label: 'UL', style: 'unordered-list-item' },
    { label: 'OL', style: 'ordered-list-item' },
    { label: 'Code Block', style: 'code-block' },
];

const BlockStyleControls = (props) => {
    const { editorState } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

var INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
    { label: 'Monospace', style: 'CODE' },
];

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle();
    console.log("InlineStyleControls , currentStyle", currentStyle)

    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

// class MyEditor extends React.Component {
//     // ...
//     _onBoldClick() {
//       this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
//     }

//     render() {
//       return (
//         <div>
//           <button onClick={this._onBoldClick.bind(this)}>Bold</button>
//           <Editor
//             editorState={this.state.editorState}
//             handleKeyCommand={this.handleKeyCommand}
//             onChange={this.onChange}
//           />
//         </div>
//       );
//     }
//   }


export default RichTextEditor;