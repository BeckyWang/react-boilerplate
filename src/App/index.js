import React from "react";
import styles from './styles';

export default class Hello extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className={styles['container']}>Hello, World!!!! </div>
		);
	}
}