import React from "react";
import axios from "Helper/axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ToolBox from "./ToolBox";
import Product from "./Product";
import Panel from "./Panel";
import AddInventory from "./AddInventory";

class Products extends React.Component {
  state = {
    products: [],
    sourceProducts: [],
    cartNum: 0,
  };

  componentDidMount() {
    // fetch('http://localhost:3003/products')
    // .then(response => response.json())
    // .then(data =>{
    //     this.setState({
    //         products : data,
    //     })
    // })
    axios.get("/products").then((response) => {
      this.setState({
        products: response.data,
        sourceProducts: response.data,
      });
    });
    this.updateCartNum();
  }

  search = (text) => {
    // 1. get new array
    let _products = [...this.state.sourceProducts];

    // 2. filter new array
    _products = _products.filter((p) => {
      const matchArray = p.name.match(new RegExp(text, "gi"));
      console.log(!!matchArray);
      return !!matchArray;
    });

    //3. setState
    this.setState({
      products: _products,
    });
  };

  toAdd = () => {
    Panel.open({
      component: AddInventory,
      callback: (data) => {
        if (data) {
          this.add(data);
        }
      },
    });
  };

  add = (data) => {
    const _product = [...this.state.products];
    _product.push(data);

    const _sProduct = [...this.state.sourceProducts];
    _sProduct.push(data);

    this.setState({
      products: _product,
      sourceProducts: _sProduct,
    });
  };

  update = (product) => {
    const _product = [...this.state.products];
    const _index = _product.findIndex((p) => p.id === product.id);
    _product.splice(_index, 1, product);

    const _sProduct = [...this.state.sourceProducts];
    const _sIndex = _product.findIndex((p) => p.id === product.id);
    _sProduct.splice(_sIndex, 1, product);

    this.setState({
      products: _product,
      sourceProducts: _sProduct,
    });
  };

  delete = (id) => {
    const _product = this.state.products.filter((p) => p.id !== id);
    const _sProduct = this.state.sourceProducts.filter((p) => p.id !== id);
    this.setState({
      products: _product,
      sourceProducts: _sProduct,
    });
  };

  updateCartNum = async () => {
    const cartNum = await this.initCartNum();
    this.setState({
      cartNum: cartNum,
    });
  };

  initCartNum = async () => {
    const user = global.auth.getUser() || {};
    const res = await axios.get(`/carts`, {
      params: {
        userId: user.email
      }
    });
    const carts = res.data;
    const cartNum = carts
      .map((cart) => cart.mount)
      .reduce((a, value) => a + value, 0);
    return cartNum;
  };

  renderMangerBtn = () => {
    const user = global.auth.getUser() || {};
    if (user.type === 1) {
      return (
        <button className="button is-primary add-btn" onClick={this.toAdd}>
          Add
        </button>
      );
    }
  };

  render() {
    return (
      <div>
        <ToolBox search={this.search} cartNum={this.state.cartNum} />
        <div className="products">
          <div className="columns is-multiline is-desktop">
            <TransitionGroup component={null}>
              {this.state.products.map((p) => {
                return (
                  <CSSTransition
                    classNames={"product-fade"}
                    timeout={300}
                    key={p.id}
                  >
                    <div className="column is-3" key={p.id}>
                      <Product
                        product={p}
                        update={this.update}
                        delete={this.delete}
                        updateCartNum={this.updateCartNum}
                      />
                    </div>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </div>
          {(global.auth.getUser() || {}).type === 1 && (
            <button className="button is-primary add-btn" onClick={this.toAdd}>
              Add
            </button>
          )}
          {/* {this.renderMangerBtn()} */}
        </div>
      </div>
    );
  }
}

export default Products;
