import React from "react";
import {Button} from "antd";
import IntlMessages from "util/IntlMessages";
import {getMoney} from "../../../../util/ParseUtils";

const PriceItem = (props) => {
    const item = props.props;

    function getInputScore() {
        if (item.input_score === null || item.input_score === 0) {
            return <b><IntlMessages id="view.course.inputScore"/></b>
        } else {
            return <b>{item.input_score}</b>
        }
    }

    function getOutputScore() {
        if (item.input_score === null || item.input_score === 0) {
            return <b><IntlMessages id="view.course.outputScore"/></b>
        } else {
            return <b>{item.input_score}</b>
        }
    }

    return (
        <div className="gx-package">
            <div className="gx-package-header gx-bg-yellow gx-text-black">
                <h2 className="gx-letter-spacing-base gx-text-white gx-text-uppercase gx-mb-0"
                    style={{fontSize: "25px"}}>
                    <b>{item.name}</b>
                </h2>
            </div>

            <div className="gx-package-body">
                <ul className="gx-package-items" style={{lineHeight: "2"}}>
                    <li>
                        <i className="icon icon-hotel-booking"/>
                        <span><IntlMessages
                            id="admin.course.table.numberOfShift"/>: <b>{item.number_of_shift}</b></span>
                    </li>
                    <li>
                        <i className="icon icon-signin"/>
                        <span><IntlMessages id="admin.user.student.table.input_score"/>: {getInputScore()}</span>
                    </li>
                    <li>
                        <i className="icon icon-signup"/>
                        <span><IntlMessages id="admin.user.student.table.output_score"/>: {getOutputScore()}</span>
                    </li>
                    <li>
                        <i className="icon icon-revenue-new"/>
                        <span><IntlMessages id="admin.course.table.tuition"/>: <b>{getMoney(item.tuition)}</b></span>
                    </li>
                </ul>
                <div className="gx-package-footer">
                    <Button type="primary" className="gx-btn-block">
                        <IntlMessages id="admin.user.form.register"/>
                    </Button>
                </div>
            </div>


        </div>
    )
};

export default PriceItem;
