import React ,{Component}from 'react'
import styles from './index.module.css';
import PropTypes from 'prop-types'
export default class Layout extends Component {
    static propTypes = {
        header: PropTypes.element,
        footer: PropTypes.element,
        main: PropTypes.element,
    }
    componentDidMount(){
        // console.log(this.props)
    }

    render (){
        return(
            <div className="container">
                <header className={styles.header}>
                    {this.props.header}
                </header>
                <main>
                    {this.props.main}
                </main>
                <footer>
                    {this.props.footer}
                </footer>
            </div>
        ) 
    }
}