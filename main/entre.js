import resetCss from '../css/reset.less';

import CheckBoxDemo from "./demo/CheckBoxDemo.jsx";
import RadioDemo from "./demo/RadioDemo.jsx";
import RadioGroupDemo from "./demo/RadioGroupDemo.jsx";
import CheckBoxGroupDemo from "./demo/CheckBoxGroupDemo.jsx";
import DropDownDemo from "./demo/DropDownDemo.jsx";
import MenuDemo from "./demo/MenuDemo.jsx";

// React.render(<CheckBoxDemo/>, document.getElementById('checkbox'));
// React.render(<RadioDemo/>, document.getElementById('radio'));
// React.render(<RadioGroupDemo/>, document.getElementById('radio-group'));
// React.render(<CheckBoxGroupDemo/>, document.getElementById('checkbox-group'));
React.render(<DropDownDemo/>, document.getElementById('drop-down'));
// React.render(<MenuDemo/>, document.getElementById('menu'));