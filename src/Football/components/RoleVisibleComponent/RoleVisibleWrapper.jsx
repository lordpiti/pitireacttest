//Just another version of this HOC, creating a wrapper and using children props

const roleVisibleWrapper = ({ roles, ...props }) => {

	let content = null;

	if (roles.some(role => role === localStorage.role_react)) {
		content = props.children;
	}

	return content;
}

export default roleVisibleWrapper;