import PropTypes from "prop-types"
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'



const Button = ({color, text, onClick}) => {
    const [clickState, setClick] = useState()
    const onButtonClicked = async () => {
        
        let r = await onClick()
        setClick(r)
        // ReactDOM.render(document.getElementById('main'))
        // this.setState({s: "changed"})
    }

    return (<button onClick={onButtonClicked} style={{ backgroundColor: color}} 
    className="btn">{text}</button>
    )
}

Button.defaultProps = {
    color: "black",
    text: "Text"
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button