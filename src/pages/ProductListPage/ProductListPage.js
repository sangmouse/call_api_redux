import React, { Component } from 'react';
import ProductList from './../../components/ProductList/ProductList'
import ProductItem from './../../components/ProductItem/ProductItem'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {actFetchProductsRequest, actDeleteProduct} from './../../actions/index'

class ProductListPage extends Component {


    showProducts = (products) => {
        var result = null
        if(products.length > 0){
            result = products.map((product, index) => {
                return (
                    <ProductItem
                        key={index}
                        product={product}
                        index={index}
                        onDelete={this.onDelete}
                    />
                )
            })
        }

        return result
    }

    componentDidMount(){
       this.props.fetchAllProducts()

    }
    
    onDelete = (id) => {
        this.props.onDeleteProduct(id)
    }

    render() {
        var {products} = this.props

        return (
            <div className="col-12">
                <Link to="/product/add" className="btn btn-primary">
                    Thêm sản phẩm
                </Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>
        );
        
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchAllProducts: () => {
            dispatch(actFetchProductsRequest())
        },
        onDeleteProduct : (id) => {
            dispatch(actDeleteProduct(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);

