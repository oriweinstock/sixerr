
// import React from 'react'


// export class WindowSize extends React.Component {

//     state= {
//         windowWidth:null,
//     }

//     constructor(props) {
//         super(props);
//         this.state = { windowWidth: window.innerWidth };
//     }

//     handleResize = (e) => {
//         console.log("windowWidth", windowWidth)
//         this.setState({ windowWidth: window.innerWidth });
//     };

//     componentDidMount() {
//         window.addEventListener("resize", this.handleResize);
//     }

//     componentWillUnMount() {
//         window.addEventListener("resize", this.handleResize);
//     }

//     render() {
//         const { windowWidth } = this.state;
//         return <div>Current window width: {windowWidth}</div>
//     }
// }
