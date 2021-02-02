import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Input } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { showErrorMsg, showSuccessMsg } from '../helpers/message';
import { updateCategory, deleteCategory } from '../redux/actions/categoryAction';

const Categories = () => {
    const { categories } = useSelector(state => state.categories);
    const { successMsg, errorMsg } = useSelector(state => state.messages)

    return (
        <Container >
        <div style={{ backgroundColor: "#f8f9fa", padding: "50px"}}>
            <Row>
                <h2 className="animated bounceInLeft font-effect-shadow-multiple" style={{margin : "0 20px 20px 20px", fontFamily : "Sofia, sans-serif"}}>Categories</h2>
            </Row>
            <Row>
                { errorMsg && showErrorMsg(errorMsg) }
                { successMsg && showSuccessMsg(successMsg) }
                <Table hover>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.map((item, index) => {
                                if(item) return <Category key={item._id} item={item} index={index}/>
                            })
                        }
                    </tbody>
                </Table>
            </Row>
        </div>
        </Container>
    );
};

const Category = ({ item, index }) => {
    const [isEdit, setEdit] = useState(false);
    const [categoryUpdate, setCategoryUpdate] = useState(item.category);
    const dispatch = useDispatch();

    const handleEdit = () => {
        setEdit(!isEdit)
    }

    const handleUpdateCategory = (id, category) => {
        const data = {
            category
        }
        dispatch(updateCategory(id, data));
        setEdit(false)
    }

    const handleDelete = (id) => {
        if (confirm('Are you sure to delete this category ?')) { //eslint-disable-line
            dispatch(deleteCategory(id))
        }
    }
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>
                {
                    isEdit ? 
                    <Row>
                        <Col xs="8" sm="8" md="8">
                            <Input 
                                value={categoryUpdate}
                                onChange={e => setCategoryUpdate(e.target.value)}
                            /> 
                        </Col>
                        <Col xs="4" sm="4" md="4">
                            <img src="/img/ok.svg"  width="20px" onClick={() => handleUpdateCategory(item._id, categoryUpdate)} style={{marginRight: "10px", cursor: "pointer"}}/>
                            <img src="/img/cancel.svg"  width="20px" onClick={handleEdit} style={{cursor: "pointer"}}/>
                        </Col>
                    </Row>
                    : item.category
                }
            </td>
            <td><Button color="warning" onClick={handleEdit}>Edit</Button></td>
            <td><Button color="danger" onClick={() => handleDelete(item._id)}>Delete</Button></td>
        </tr>
    )
}

export default Categories;