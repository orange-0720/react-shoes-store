import React from "react";
import axios from "Helper/axios";
import { toast } from "react-toastify";

class EditInventory extends React.Component {
  state = {
    id: "",
    name: "",
    price: 0,
    tags: "",
    image: "",
    status: "available",
  };

  componentDidMount() {
    const { id, name, tags, image, price, status } = this.props.product;
    this.setState({
      id,
      name,
      tags,
      image,
      price,
      status,
    });
  }

  handelChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  submit = e => {
    e.preventDefault();
    const product = { ...this.state };
    axios.put(`products/${this.state.id}`, product).then((res) => {
      this.props.close(res.data);
      toast.success("Edit Success");
    });
  };

  onDelete = () => {
    axios.delete(`products/${this.state.id}`).then( res => {
      this.props.deleteProduct(this.state.id);
      this.props.close();
      toast.success("Delete Success");
    });
  }

  render() {
    return (
      <div className="inventory">
        <p className="title has-text-centered">EditInventory</p>
        <br />
        <form onSubmit={this.submit}>
          <div className="field has-text-left has-text-left">
            <div className="control">
              <label htmlFor="" className="label">
                Name
              </label>
              <textarea
                name="name"
                className="textarea"
                value={this.state.name}
                onChange={this.handelChange}
              />
            </div>
          </div>
          <div className="field has-text-left">
            <div className="control">
              <label htmlFor="" className="label">
                Price
              </label>
              <input
                type="number"
                name="price"
                className="input"
                value={this.state.price}
                onChange={this.handelChange}
              />
            </div>
          </div>
          <div className="field has-text-left">
            <div className="control">
              <label htmlFor="" className="label">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                className="input"
                value={this.state.tags}
                onChange={this.handelChange}
              />
            </div>
          </div>
          <div className="field has-text-left">
            <div className="control">
              <label htmlFor="" className="label">
                Images
              </label>
              <input
                type="text"
                name="image"
                className="input"
                value={this.state.image}
                onChange={this.handelChange}
              />
            </div>
          </div>
          <div className="field has-text-left">
            <div className="control">
              <label htmlFor="" className="label">
                Status
              </label>
              <div className="select is-full-width">
                <select
                  name="status"
                  value={this.state.status}
                  onChange={this.handelChange}
                >
                  <option>available</option>
                  <option>unavailable</option>
                </select>
              </div>
            </div>
          </div>
          <br />
          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-link">Submit</button>
            </div>
            <div className="control">
              <button className="button is-danger" type="button" onClick={this.onDelete}>Delete</button>
            </div>
            <div className="control">
              <button
                className="button"
                type="button"
                onClick={() => {
                  this.props.close();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default EditInventory;
