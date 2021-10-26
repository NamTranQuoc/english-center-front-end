import React, {useEffect, useState} from "react";
import {showNotification} from "../../../components/common/NotifyCation";
import AddEditCourse from "./AddEditCourse";
import UpDownButton from "../../../components/common/UpDownButton";
import {getKeyByValue, getTimestamp, getToken, parseDate, range} from "../../../components/common/Utils";
import {Image, InputGroup} from "react-bootstrap";
import DateRange from "../../../components/common/DateRange";
import CustomInput from "../../../components/common/CustomInput";
import {Redirect} from "react-router-dom";
import {getCourses} from "../../../service/CourseService";
import Select from "react-select";

const key = {
    _id: "ID",
    name: "Tên khóa học",
    create_date: "Ngày tạo",
    tuition: "Học phí",
    number_of_shift: "Số buổi học",
};
const storage_category_courses = JSON.parse(localStorage.getItem('category_course'));

const style = {
    control: base => ({
        ...base,
        border: 0,
        boxShadow: "none"
    })
};

function ManagerCourse(props) {
    const [object, setObject] = useState({
        items: [],
        total_pages: 1,
        current_page: 1,
        has_next: false,
        has_previous: false,
        next_page: 1,
        previous_page: 1,
        total_items: 0,
    })
    const [showAdd, setShowAdd] = useState(false);

    const [size, setSize] = useState(5);
    const [page, setPage] = useState(1);
    const [item, setItem] = useState(null);
    const [keyword, setKeyword] = useState(null);
    const [category_courses, setCategory_courses] = useState([]);
    const [sort, setSort] = useState({is_asc: false, field: "ID"})
    const [create_date, setCreate_date] = useState({from: null, to: null});
    const [is_update, setIs_update] = useState(true);

    useEffect(() => {
        getCourses(
            page,
            size,
            getKeyByValue(key, sort.field),
            sort.is_asc,
            category_courses,
            keyword,
            getTimestamp(create_date.from),
            getTimestamp(create_date.to)
        ).then((Response) => {
            if (Response.data.code !== -9999) {
                setObject(Response.data.payload)
            } else {
                showNotification(Response.data.message);
            }
        });
    }, [category_courses, keyword, sort, create_date, size, page, is_update])

    function handleSelect(e) {
        setCategory_courses(Array.isArray(e) ? e.map((x) => x.value) : []);
    }

    function onSort(event) {
        setSort({
            is_asc: !sort.is_asc,
            field: event.target.innerText
        });
    }

    function onChangePage(event) {
        setPage(event.target.attributes.value.value);
    }

    function changeSize(event) {
        const s = event.target.attributes.value.value;
        setPage(parseInt((
            (object.current_page * size - (size - 1)) / s
        ).toString()) + 1);
        setSize(s);
    }

    function setDates(dates) {
        if (dates !== null) {
            setCreate_date({
                from: dates[0],
                to: dates[1]
            });
        } else {
            setCreate_date({
                from: null,
                to: null
            });
        }
    }

    function onShowAdd() {
        setShowAdd(!showAdd);
        setItem(props.item);
    }

    function closeModal() {
        setShowAdd(!showAdd);
        setItem(props.item);
    }

    function onShowEdit(event) {
        setShowAdd(!showAdd);
        const ob = JSON.parse(event.currentTarget.getAttribute("data-item"))
        setItem(ob);
    }

    function getPageShow() {
        if (object.current_page - 2 < 1) {
            return range(1, object.total_pages > 5 ? 5 : object.total_pages);
        }
        if (object.current_page + 2 > object.total_pages) {
            return range(
                object.total_pages - 5 > 1 ? object.total_pages - 4 : 1,
                object.total_pages
            );
        }
        return range(object.current_page - 2, object.current_page + 2);
    }

    function onPreviousPage() {
        setPage(object.previous_page);
    }

    function onNextPage() {
        setPage(object.next_page);
    }

    function onChangeKeyword(value) {
        setKeyword(value);
    }

    function onSetIsUpdate() {
        setIs_update(!is_update);
    }

    function getNameCategoryCourse(id) {
        for (let i = 0; i < storage_category_courses.length; i++) {
            if (storage_category_courses[i].value === id) {
                return storage_category_courses[i].label;
            }
        }
        return "-";
    }

    if (getToken() == null) {
        return <Redirect to="/login"/>;
    } else {
        return (
            <React.Fragment>
                <div className="main-content">
                    <section className="section">
                        <div className="section-header">
                            <h1>Khóa học</h1>
                            <div className="section-header-breadcrumb">
                                <div className="breadcrumb-item">
                                    <button
                                        onClick={onShowAdd}
                                        className="btn btn-icon btn-primary"
                                    >
                                        <i className="fas fa-plus"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="section-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div
                                            className="custom-css-006"
                                        >
                                            <InputGroup className="custom-css-007">
                                                <InputGroup.Text className="custom-css-008">
                                                    Ngày tạo:
                                                </InputGroup.Text>
                                                <DateRange setDates={setDates}/>
                                            </InputGroup>
                                            <InputGroup className="custom-css-007">
                                                <InputGroup.Text className="custom-css-008">
                                                    Loại:
                                                </InputGroup.Text>
                                                <Select
                                                    placeholder={"Chọn"}
                                                    closeMenuOnSelect={false}
                                                    isMulti
                                                    options={storage_category_courses}
                                                    value={storage_category_courses.filter((obj) =>
                                                        category_courses.includes(obj.value)
                                                    )}
                                                    onChange={handleSelect}
                                                    styles={style}
                                                />
                                            </InputGroup>
                                        </div>
                                        <div className="card-body p-0">
                                            <InputGroup>
                                                <InputGroup.Text>
                                                    <Image className="custom-css-009"
                                                           src="https://firebasestorage.googleapis.com/v0/b/englishcenter-bd4ab.appspot.com/o/images%2Fsearch.png?alt=media&token=FGHT2AXQBr0xWNS6d7mALw=="/>
                                                </InputGroup.Text>
                                                <CustomInput
                                                    onSubmit={onChangeKeyword}
                                                />
                                            </InputGroup>
                                            <div className="table-responsive">
                                                <table className="table table-hover table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th onClick={onSort}>
                                                            <UpDownButton
                                                                asc={sort.is_asc}
                                                                col_name={key._id}
                                                                select_field={sort.field}
                                                            />
                                                        </th>
                                                        <th>Loại</th>
                                                        <th onClick={onSort}>
                                                            <UpDownButton
                                                                asc={sort.is_asc}
                                                                col_name={key.name}
                                                                select_field={sort.field}
                                                            />
                                                        </th>
                                                        <th onClick={onSort}>
                                                            <UpDownButton
                                                                asc={sort.is_asc}
                                                                col_name={key.tuition}
                                                                select_field={sort.field}
                                                            />
                                                        </th>
                                                        <th onClick={onSort}>
                                                            <UpDownButton
                                                                asc={sort.is_asc}
                                                                col_name={key.number_of_shift}
                                                                select_field={sort.field}
                                                            />
                                                        </th>
                                                        <th onClick={onSort}>
                                                            <UpDownButton
                                                                asc={sort.is_asc}
                                                                col_name={key.create_date}
                                                                select_field={sort.field}
                                                            />
                                                        </th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    {object.items.map((item, index) => {
                                                        return (
                                                            <tr
                                                                key={index + 1}
                                                                data-item={JSON.stringify(item)}
                                                                onClick={onShowEdit}
                                                            >
                                                                <th>{index + 1}</th>
                                                                <td>{item._id}</td>
                                                                <td>{getNameCategoryCourse(item.category_course_id)}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.tuition}</td>
                                                                <td>{item.number_of_shift}</td>
                                                                <td>{parseDate(item.create_date)}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <nav className="d-inline-block">
                                                <ul className="pagination mb-0">
                                                    <li
                                                        key="previous"
                                                        className={
                                                            object.has_previous
                                                                ? "page-item"
                                                                : "page-item disabled"
                                                        }
                                                        onClick={
                                                            object.has_previous ? onPreviousPage : null
                                                        }
                                                    >
                                                        <button className="page-link" tabIndex="-1">
                                                            <i className="fas fa-chevron-left"/>
                                                        </button>
                                                    </li>
                                                    {Array.from(getPageShow(), (e, i) => {
                                                        return (
                                                            <li
                                                                key={e}
                                                                className={
                                                                    object.current_page === e
                                                                        ? "page-item active"
                                                                        : "page-item"
                                                                }
                                                            >
                                                                <button
                                                                    className="page-link"
                                                                    onClick={onChangePage}
                                                                    value={e}
                                                                >
                                                                    {e}
                                                                    <span className="sr-only">(current)</span>
                                                                </button>
                                                            </li>
                                                        );
                                                    })}
                                                    <li
                                                        key="next"
                                                        className={
                                                            object.has_next
                                                                ? "page-item"
                                                                : "page-item disabled"
                                                        }
                                                        onClick={object.has_next ? onNextPage : null}
                                                    >
                                                        <button className="page-link">
                                                            <i className="fas fa-chevron-right"/>
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                            <div className="float-right">
                                                <button
                                                    type="button"
                                                    className="btn btn-light dropdown-toggle"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    {size + " dòng mỗi trang"}
                                                </button>
                                                <div
                                                    className="dropdown-menu"
                                                    style={{width: "auto"}}
                                                >
                                                    <button
                                                        className="btn btn-outline-secondary dropdown-item"
                                                        type="button"
                                                        value="5"
                                                        onClick={changeSize}
                                                    >
                                                        5 dòng mỗi trang
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-secondary dropdown-item"
                                                        type="button"
                                                        value="10"
                                                        onClick={changeSize}
                                                    >
                                                        10 dòng mỗi trang
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-secondary dropdown-item"
                                                        type="button"
                                                        value="20"
                                                        onClick={changeSize}
                                                    >
                                                        20 dòng mỗi trang
                                                    </button>
                                                </div>
                                            </div>
                                            <div
                                                className="float-right"
                                                style={{marginRight: "5px"}}
                                            >
                                                <button type="button" className="btn btn-light">
                                                    {"Tổng khóa học: " + object.total_items}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                {showAdd && (
                    <AddEditCourse
                        show_add={showAdd}
                        close_modal={closeModal}
                        course={item}
                        reload={onSetIsUpdate}
                    />
                )}
            </React.Fragment>
        );
    }
}

ManagerCourse.defaultProps = {
    item: {
        _id: -1,
        name: "",
        tuition: 0,
        number_of_shift: 0,
        description: "",
    },
};

export default ManagerCourse;
