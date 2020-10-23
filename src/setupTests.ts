import 'regenerator-runtime/runtime'; // Important that this is imported as its needed by the component library
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import '@testing-library/jest-dom/extend-expect';

configure({ adapter: new Adapter() });

export default null;
