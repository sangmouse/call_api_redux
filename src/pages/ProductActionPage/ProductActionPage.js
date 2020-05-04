import React, { Component } from 'react';
import './../../App.css'
import { Link } from 'react-router-dom';
import { actAddProductRequest, actGetProductRequest, actUpdateProductRequest } from '../../actions';
import { connect } from 'react-redux'

class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        };
    }

    onChange = (e) => {
        var target = e.target
        var name = target.name
        var value = target.type === 'checkbox' ? target.checked : target.value
        this.setState({
            [name]: value
        })
    }

    componentDidMount() {
        var { match } = this.props
        if (match) {
            var id = match.params.id
            this.props.onEditProduct(id)
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps
            this.setState({
                id: itemEditing.id,
                txtName: itemEditing.name,
                txtPrice: itemEditing.price,
                chkbStatus: itemEditing.status
            })
        }
    }

    onSave = (e) => {
        e.preventDefault()
        var { id, txtName, txtPrice, chkbStatus } = this.state
        var { history } = this.props
        var product = {
            id: id,
            name: txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) {
            this.props.onUpdateProduct(product)
        }else {
            if (txtName === '' || txtPrice === '') {
                alert("enter information pls !")
            } else {
                this.props.onAddProduct(product)
            }
        }
        history.goBack()

    }



    render() {
        var { txtName, txtPrice, chkbStatus } = this.state

        return (

            <div className="col-6">
                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label className="bold">Tên sản phẩm:</label>
                        <input type="text" className="form-control" name="txtName" value={txtName} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label className="bold">Gía sản phẩm:</label>
                        <input type="number" className="form-control" name="txtPrice" value={txtPrice} onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label className="bold">Trạng thái:</label>
                    </div>
                    <div className="form-check mb-15">
                        <label className="form-check-label">
                            <input type="checkbox" className="form-check-input" name="chkbStatus" value={chkbStatus} onChange={this.onChange} checked={chkbStatus} />
                        Còn hàng
                      </label>
                    </div>
                    <Link to="/product-list" className="btn btn-danger mr-10">
                        Trở lại
                    </Link>
                    <button type="submit" className="btn btn-primary btn-submit">Submit</button>
                </form>

            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product))
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id))
        },
        onUpdateProduct : (product) => {
            dispatch(actUpdateProductRequest(product))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);

